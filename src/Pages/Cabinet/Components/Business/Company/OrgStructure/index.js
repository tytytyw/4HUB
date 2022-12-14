import React, { useState, useEffect, useCallback } from "react";
import styles from "./OrgStructure.module.sass";
import ReactFlow, { isEdge, removeElements, addEdge, Controls } from "react-flow-renderer";
import CustomNodeComponent from "./CustomNodeComponent";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { useContextMenuPerson } from "../../../../../../generalComponents/collections";
import AddEmployee from "../AddEmployee";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import EditPerson from "../ContexMenuComponents/OrgStructure/EditPerson";
import { ReactComponent as Plus } from "../../../../../../assets/PrivateCabinet/plus-3.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { mouseParamsProps } from "../../../../../../types/MouseParams";
import { actionProps } from "../../../../../../types/Action";

function OrgStructure({
  mouseParams,
  setMouseParams,
  renderMenuItems,
  setAction,
  nullifyAction,
  setPageOption,
  action
}) {
  const { __ } = useLocales();
  const contextMenuPerson = useContextMenuPerson();
  const onNodeDragStop = (el, node) => {
    changeNodeCoorditates(node);
  };
  const onElementClick = (e, element) => {
    if (element.type === "special") {
      setChosenPerson(element);
      if (e.target.tagName !== "path" && e.target.className.toString().includes("menu"))
        setMouseParams({
          type: "contextMenu",
          x: e.clientX,
          y: e.clientY,
          width: 220,
          height: 25
        });
      if (e.target.tagName === "path" && e.target.viewportElement.classList.value.includes("plusIcon"))
        setAction({
          type: "add-employee",
          name: __("Добавить сотрудника"),
          text: ""
        });
    } else if (isEdge(element)) {
      setChosenLine(element);
      setMouseParams({
        type: "deleteLine",
        x: e.clientX,
        y: e.clientY,
        width: 16,
        height: 19
      });
    }
  };
  const connectionLineStyle = { stroke: "#b1b1b7" };
  const snapGrid = [10, 10];
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [chosenPerson, setChosenPerson] = useState(null);
  const [chosenLine, setChosenLine] = useState(null);

  const callbackArr = [
    {
      type: "add-employee",
      name: __("Добавить сотрудника"),
      text: ``,
      callback: () =>
        setAction({
          type: "add-employee",
          name: __("Добавить сотрудника"),
          text: ""
        })
    },
    {
      type: "delete",
      name: __("Удаление сотрудника"),
      text: __(
        `Вы действительно хотите удалить пользователя ${
          chosenPerson?.data.info.surname +
          " " +
          chosenPerson?.data.info.name +
          " " +
          chosenPerson?.data.info.middleName
        } из орг структуры компании?`
      ),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "info",
      name: __("Информация о сотруднике"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "customize",
      name: __("Редактирование сотрудника"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    }
  ];

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      setTimeout(() => reactflowInstance.fitView(), 100);
    }
  }, [reactflowInstance, elements.length]);

  const onElementsRemove = useCallback((elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }, []);
  const onConnect = useCallback(
    (params) =>
      setElements((els) =>
        addEdge(
          {
            ...params,
            type: "step",
            style: { stroke: "#b1b1b7", strokeWidth: 2 }
          },
          els
        )
      ),
    []
  );

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  const nodeTypes = {
    special: CustomNodeComponent
  };

  const addPerson = (info) => {
    const newPerson = {
      //TODO: change id
      id: elements.length + 1 + info.middleName + info.surname,
      type: "special",
      data: { info },
      position: {
        x: typeof chosenPerson?.position.x === "number" ? chosenPerson?.position.x + 300 : 10,
        y: typeof chosenPerson?.position.y === "number" ? chosenPerson?.position.y + 34 : 10
      }
    };
    const newLine = {
      id: chosenPerson?.id + "line" + elements.length,
      type: "step",
      style: { strokeWidth: 2 },
      source: chosenPerson?.id,
      target: elements.length + 1 + info.middleName + info.surname
    };

    const newElements = elements.map((el) => {
      if (el.position) {
        if (
          el.position.x > newPerson.position.x - 100 &&
          el.position.x < newPerson.position.x + 100 &&
          el.position.y > newPerson.position.y - 10
        ) {
          const newEl = {
            ...el,
            position: { x: el.position.x, y: el.position.y + 75 }
          };
          return newEl;
        }
        if (
          el.position.x > newPerson.position.x - 400 &&
          el.position.x < newPerson.position.x - 200 &&
          el.position.y > newPerson.position.y
        ) {
          const newEl = {
            ...el,
            position: { x: el.position.x, y: el.position.y + 75 }
          };
          return newEl;
        }
        return el;
      }
      return el;
    });
    setElements(chosenPerson ? [...newElements, newPerson, newLine] : [newPerson]);
  };

  const deletePerson = () => {
    const elementsToRemove = elements.filter(
      (el) => chosenPerson?.id === el.id || chosenPerson?.id === el.source || chosenPerson?.id === el.target
    );
    onElementsRemove(elementsToRemove);
    nullifyAction();
  };

  const deleteLine = () => {
    const elementsToRemove = elements.filter((el) => chosenLine?.id === el.id);
    onElementsRemove(elementsToRemove);
    nullifyAction();
  };

  const editPerson = (newData) => {
    const newItem = {
      id: newData.person.id,
      type: newData.person.type,
      data: { info: newData.newInfo },
      position: newData.person.position
    };
    setElements((elements) => elements.map((item) => (item.id === newItem.id ? newItem : item)));
    nullifyAction();
  };

  const changeNodeCoorditates = (node) => {
    const checkCordinates = (position) => (position < 0 ? 0 : position);
    const newItem = {
      ...node,
      position: {
        x: checkCordinates(node.position.x),
        y: checkCordinates(node.position.y)
      }
    };
    setElements((elements) => elements.map((item) => (item.id === newItem.id ? newItem : item)));
    if (node.position.x < 0 || node.position.y < 0) setTimeout(() => reactflowInstance.fitView(), 100);
  };

  return (
    <div className={styles.wrapper}>
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onLoad={onLoad}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        translateExtent={[
          [0, 0],
          [Infinity, Infinity]
        ]}
        // paneMoveable={false}
        minZoom={0.1}
      >
        <Controls />
        {!elements.length && (
          <div
            className={styles.firstPersonAdd}
            onClick={() =>
              setAction({
                type: "add-employee",
                name: __("Добавить сотрудника"),
                text: ""
              })
            }
          >
            <Plus className={styles.plusIco} />
            <span className={styles.tile}>{__("Добавить Руководителя компании")}</span>
          </div>
        )}
      </ReactFlow>
      {mouseParams !== null && mouseParams.type === "contextMenu" ? (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          tooltip={true}
          customClose={true}
          disableAutohide={true}
        >
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuPerson, callbackArr)}</div>
        </ContextMenu>
      ) : null}

      {mouseParams !== null && mouseParams.type === "deleteLine" ? (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          tooltip={false}
          customClose={true}
          disableAutohide={true}
        >
          <div className={styles.menuLine} onClick={() => deleteLine(chosenLine)} title={__("удалить линию")} />
        </ContextMenu>
      ) : null}

      {action.type === "add-employee" ? (
        <AddEmployee nullifyAction={nullifyAction} setPageOption={setPageOption} addPerson={addPerson} />
      ) : null}
      {action.type === "customize" ? (
        <EditPerson nullifyAction={nullifyAction} person={chosenPerson} editPerson={editPerson} />
      ) : null}
      {action.type === "info" ? (
        <EditPerson nullifyAction={nullifyAction} person={chosenPerson} editPerson={editPerson} disableСhanges={true} />
      ) : null}
      {action.type === "delete" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={deletePerson}
          approve={__("Удалить")}
        >
          {/* TODO: past actual avatar */}
          <img src={`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`} alt="avatar" className={styles.icon} />
        </ActionApproval>
      ) : null}
    </div>
  );
}

export default OrgStructure;
OrgStructure.propTypes = {
  mouseParams: mouseParamsProps,
  setMouseParams: PropTypes.func,
  renderMenuItems: PropTypes.func,
  setAction: PropTypes.func,
  nullifyAction: PropTypes.func,
  setPageOption: PropTypes.func,
  action: actionProps
};
