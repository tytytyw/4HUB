import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
// import Pencil from "../Pencil";
import styles from "./LineDraw.module.sass";

function LineDraw({canvas, canvasWrapRef, onFinishDraw, addTool}) {

    const dotRightRef = useRef(null);
    const dotLeftRef = useRef(null);
    const lineRef = useRef(null);

    const [params, setParams] = useState({move: false, widthDif: 0, heightDif: 0, sizeChange: false, initialParams: {x: 0, y: 0, b: 0, c: 0}, axis: null})

    const paint = useSelector(s => s.Cabinet.paint);

    const handleMouseDown = ev => {
        let axis = null;
        const widthDif = ev.nativeEvent.layerX;
        const initialParams = {x: ev.pageX, y: params.initialParams.y === 0 ? ev.pageY : params.initialParams.y}

        if(ev.target.className === styles.dotLeft) {
            const params = dotRightRef.current.getBoundingClientRect();
            axis = {y: params.top + params.height/2, x: params.left + params.width/2};
        }
        if(ev.target.className === styles.dotRight) {
            const params = dotLeftRef.current.getBoundingClientRect();
            axis = {y: params.top + params.height/2, x: params.left + params.width/2};
        }

        let isCircle = false;
        ev.nativeEvent.path.forEach(el => {if(el.className && el.className.includes('dot')) isCircle = true})

        let status = isCircle ? 'resize' : 'move';
        if(status === 'resize') {setParams(s => ({...s, initialParams: {...s.initialParams, x: ev.pageX, y: s.initialParams.y === 0 ? ev.pageY : s.initialParams.y}}))}

        window.onmouseup = () => {
            window.onmouseup = null;
            window.onmousemove = null;
        };

        window.onmousemove = e => {
            if(status === 'move') {
                lineRef.current.style.left = e.pageX - canvas.getBoundingClientRect().x - widthDif + "px";
                lineRef.current.style.top = e.pageY - canvasWrapRef.current.getBoundingClientRect().y + "px";
            }
            if(status === 'resize') {
                const arrow = lineRef.current.getBoundingClientRect()
                const arrowEndX = arrow.left + arrow.width;
                const b = initialParams.y - e.pageY;
                const c = e.pageX <= axis.x ? -((arrow.left + arrow.width) - e.pageX) : e.pageX - arrow.left;
                const a = Math.round(Math.sqrt(b*b + c*c));
                if(a !== 0 && b !== 0 && c !== 0) {
                    const degree = Math.round(Math.atan(c / b) * 180 / Math.PI);
                    lineRef.current.style.transformOrigin = `center left`;
                    lineRef.current.style.transform = `rotate(${b > 0 ? degree - 90 : degree + 90}deg)`;
                    lineRef.current.style.width = (a - 3) + "px";
                } else {
                    lineRef.current.style.width = (arrow.width + e.pageX - arrowEndX - 3) + "px";
                }
            }
        };
    }

    useEffect(() => {
        // canvas.onmousedown = async () => {
        //     await onFinishDraw(canvas.toDataURL());
        //     await drawText(canvas, textBlockRef);
        //     addTool(Pencil);
        // }
        // return () => {
        //     canvas.onmousedown = null;
        // }
    }, [paint]) //eslint-disable-line

    const preventDrag = e => {
        console.log(e);
        e.preventDefault();
    }

    return(
        <div
            ref={lineRef}
            className={styles.arrowOutlined}
            onMouseDown={handleMouseDown}
            draggable={false}
            style={{
                height: paint.size,
                background: `linear-gradient(90deg, ${paint.color} 0%, ${paint.color} 99%, rgba(0, 0, 0, 0) 99%)`
            }}
        >
            <span
                className={styles.arrow}
                style={{
                    border: `${paint.size + 9}px solid transparent`,
                    borderLeft: `${paint.size + 9}px solid ${paint.color}`,
                    right: - (paint.size + 9)
                }}
                draggable={false}
            />
            <span
                className={styles.dotRight}
                style={{
                    height: 6,
                    width: 6,
                    right: -6
                }}
                ref={dotRightRef}
                draggable={false}
                onDragStart={preventDrag}
            />
            <span
                className={styles.dotLeft}
                style={{
                    height: 6,
                    width: 6,
                    left: -6
                }}
                ref={dotLeftRef}
                draggable={false}
            />
        </div>
    )
}

export default LineDraw;
