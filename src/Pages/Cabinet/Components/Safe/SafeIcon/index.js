import React from 'react'
import {colors} from "../../../../../generalComponents/collections";

const getColorObj = type => colors?.find(item => item.name === type)

const SafeIcon = ({type = 'blue', ...props}) => {

    const lightColor = getColorObj(type)?.light
    const darkColor = getColorObj(type)?.dark

    return (
        <svg className={props.className} width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="bank">

                <g id="light">
                    <path fill={lightColor} d="M36.5625 45L5.15625 45C2.31188 45 0 42.6881 0 39.8438L0 5.15625C0 2.31188 2.31188 0 5.15625 0L36.5625 0C39.4069 0 41.7188 2.31188 41.7188 5.15625L41.7188 39.8438C41.7188 42.6881 39.4069 45 36.5625 45Z" transform="translate(3.28125 0)" id="Path" stroke="none" />
                    <path fill={lightColor} d="M7.96875 7.5L1.40625 7.5C0.63 7.5 0 6.87 0 6.09375L0 1.40625C0 0.63 0.63 0 1.40625 0L7.96875 0C8.745 0 9.375 0.63 9.375 1.40625L9.375 6.09375C9.375 6.87 8.745 7.5 7.96875 7.5Z" transform="translate(0 9.375)" id="Path" stroke="none" />
                    <path fill={lightColor} d="M7.96875 7.5L1.40625 7.5C0.63 7.5 0 6.87 0 6.09375L0 1.40625C0 0.63 0.63 0 1.40625 0L7.96875 0C8.745 0 9.375 0.63 9.375 1.40625L9.375 6.09375C9.375 6.87 8.745 7.5 7.96875 7.5Z" transform="translate(0 28.125)" id="Path" stroke="none" />
                </g>

                <g id="dark">
                    <path fill={darkColor} d="M21.0938 0L5.15625 0C2.31188 0 0 2.31188 0 5.15625L0 39.8438C0 42.6881 2.31188 45 5.15625 45L21.0938 45L21.0938 0Z" transform="translate(3.28125 0)" id="Path" stroke="none" />
                    <path fill={darkColor} d="M9.375 0L0 0L0 2.34375C0 3.12 0.63 3.75 1.40625 3.75L7.96875 3.75C8.745 3.75 9.375 3.12 9.375 2.34375L9.375 0Z" transform="translate(0 31.875)" id="Path" stroke="none" />
                    <path fill={darkColor} d="M9.375 0L0 0L0 2.34375C0 3.12 0.63 3.75 1.40625 3.75L7.96875 3.75C8.745 3.75 9.375 3.12 9.375 2.34375L9.375 0Z" transform="translate(0 13.125)" id="Path" stroke="none" />
                </g>

                <path d="M11.25 22.5C8.24063 22.5 5.41687 21.33 3.29437 19.2075C1.17 17.0831 0 14.2556 0 11.25C0 8.2425 1.17 5.41687 3.29437 3.2925C5.41687 1.17 8.2425 0 11.25 0C14.2575 0 17.0831 1.16813 19.2056 3.2925C21.33 5.41687 22.5 8.2425 22.5 11.25C22.5 14.2556 21.33 17.0831 19.2056 19.2075C17.0831 21.33 14.2575 22.5 11.25 22.5Z" transform="translate(13.125 11.25)" id="Path" fill="#D5D5D5" stroke="none" />
                <path d="M11.25 0C8.24063 0 5.41687 1.17 3.29437 3.2925C1.17 5.41687 0 8.2425 0 11.25C0 14.2556 1.17 17.0831 3.29437 19.2075C5.41687 21.33 8.2425 22.5 11.25 22.5L11.25 16.9163C9.765 16.9163 8.31375 16.3125 7.26938 15.2606C6.20813 14.1919 5.625 12.7688 5.625 11.2519C5.625 9.73312 6.20813 8.31187 7.26938 7.24312C8.31375 6.19125 9.78187 5.66437 11.25 5.66437L11.25 0Z" transform="translate(13.125 11.25)" id="Path" fill="#C2C2C2" stroke="none" />
                <path d="M1.17188 6.81938C0.525 6.81938 0 6.29437 0 5.6475L0 1.17188C0 0.525 0.525 0 1.17188 0C1.81875 0 2.34375 0.525 2.34375 1.17188L2.34375 5.6475C2.34375 6.2925 1.81875 6.81938 1.17188 6.81938Z" transform="translate(23.203125 13.125)" id="Path" fill="#455A64" stroke="none" />
                <path d="M1.17188 6.81938C0.525 6.81938 0 6.29437 0 5.6475L0 1.17188C0 0.525 0.525 0 1.17188 0C1.81875 0 2.34375 0.525 2.34375 1.17188L2.34375 5.6475C2.34375 6.29437 1.81875 6.81938 1.17188 6.81938Z" transform="translate(23.203125 25.055626)" id="Path" fill="#455A64" stroke="none" />
                <path d="M1.52344 0C0.876562 0 0.351563 0.525 0.351563 1.17188L0.351563 5.6475C0.351563 6.29437 0.876562 6.81938 1.52344 6.81938L1.52344 0Z" transform="translate(22.851562 13.125)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M1.52344 0C0.876562 0 0.351563 0.525 0.351563 1.17188L0.351563 5.6475C0.351563 6.29437 0.876562 6.81938 1.52344 6.81938L1.52344 0Z" transform="translate(22.851562 25.055626)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M5.64563 2.34375L1.17188 2.34375C0.525 2.34375 0 1.81875 0 1.17188C0 0.525 0.525 0 1.17188 0L5.64563 0C6.29437 0 6.8175 0.525 6.8175 1.17188C6.8175 1.81875 6.2925 2.34375 5.64563 2.34375Z" transform="translate(15 21.328125)" id="Path" fill="#455A64" stroke="none" />
                <path d="M5.64563 2.34375L1.17188 2.34375C0.523125 2.34375 0 1.81875 0 1.17188C0 0.525 0.523125 0 1.17188 0L5.64563 0C6.2925 0 6.8175 0.525 6.8175 1.17188C6.8175 1.81875 6.2925 2.34375 5.64563 2.34375Z" transform="translate(26.9325 21.328125)" id="Path" fill="#455A64" stroke="none" />
                <path d="M6.8175 0.351563L0 0.351563C0 0.998438 0.525 1.52344 1.17188 1.52344L5.64563 1.52344C6.2925 1.52344 6.8175 0.998438 6.8175 0.351563Z" transform="translate(15 22.148438)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M6.8175 0.351563L0 0.351563C0 0.998438 0.523125 1.52344 1.17188 1.52344L5.64563 1.52344C6.2925 1.52344 6.8175 0.998438 6.8175 0.351563Z" transform="translate(26.9325 22.148438)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M5.16563 5.16563C4.70812 5.62313 3.96563 5.62313 3.50812 5.16563L0.343125 2.00063C-0.114375 1.54312 -0.114375 0.800625 0.343125 0.343125C0.800625 -0.114375 1.54312 -0.114375 2.00063 0.343125L5.16563 3.50812C5.62313 3.96563 5.62313 4.70812 5.16563 5.16563Z" transform="translate(17.401875 15.526875)" id="Path" fill="#455A64" stroke="none" />
                <path d="M5.16562 5.16563C4.70813 5.62313 3.96563 5.62313 3.50812 5.16563L0.343125 2.00063C-0.114375 1.54312 -0.114375 0.800625 0.343125 0.343125C0.800625 -0.114375 1.54313 -0.114375 2.00063 0.343125L5.16562 3.50812C5.62312 3.96563 5.62125 4.70812 5.16562 5.16563Z" transform="translate(25.839375 23.964375)" id="Path" fill="#455A64" stroke="none" />
                <path d="M0.343125 0C-0.114375 0.4575 -0.114375 1.2 0.343125 1.6575L3.50813 4.8225C3.96563 5.28 4.70813 5.28 5.16563 4.8225L0.343125 0Z" transform="translate(17.401875 15.87)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M0.343125 0C-0.114375 0.4575 -0.114375 1.2 0.343125 1.6575L3.50813 4.8225C3.96563 5.28 4.70813 5.28 5.16563 4.8225L0.343125 0Z" transform="translate(25.839375 24.3075)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M5.16375 2.00063L2.00062 5.16375C1.54313 5.62125 0.800625 5.62125 0.343125 5.16375C-0.114375 4.70625 -0.114375 3.96375 0.343125 3.50625L3.50625 0.343125C3.96375 -0.114375 4.70625 -0.114375 5.16375 0.343125C5.62125 0.800625 5.62312 1.54125 5.16375 2.00063Z" transform="translate(17.401875 23.96625)" id="Path" fill="#455A64" stroke="none" />
                <path d="M5.16375 2.00063L2.00063 5.16375C1.54313 5.62125 0.800625 5.62125 0.343125 5.16375C-0.114375 4.70625 -0.114375 3.96563 0.343125 3.50625L3.50625 0.343125C3.96375 -0.114375 4.70625 -0.114375 5.16375 0.343125C5.62125 0.8025 5.61937 1.545 5.16375 2.00063Z" transform="translate(25.84125 15.526875)" id="Path" fill="#455A64" stroke="none" />
                <path d="M4.82063 0L0 4.82063C0.4575 5.27812 1.2 5.27812 1.6575 4.82063L4.82063 1.6575C5.28 1.19813 5.27812 0.4575 4.82063 0Z" transform="translate(17.745 24.309376)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M4.82063 0L0 4.82063C0.4575 5.27812 1.19813 5.27812 1.6575 4.82063L4.82063 1.6575C5.27625 1.20187 5.27812 0.459375 4.82063 0Z" transform="translate(26.184376 15.87)" id="Path" fill="#3C4E57" stroke="none" />
                <path d="M5.625 11.2509C4.14 11.2509 2.68875 10.6472 1.64437 9.59531C0.583125 8.52656 0 7.10344 0 5.58656C0 4.06781 0.583125 2.64656 1.64437 1.57781C3.73125 -0.525937 7.51875 -0.525937 9.60563 1.57781C10.6669 2.64656 11.25 4.06781 11.25 5.58656C11.25 7.10344 10.6669 8.52656 9.60563 9.59531C8.56125 10.6472 7.11 11.2509 5.625 11.2509L5.625 11.2509Z" transform="translate(18.75 16.915312)" id="Path" fill="#ECEFF1" stroke="none" />
                <path d="M5.625 0C4.15688 0 2.68875 0.526875 1.64437 1.57875C0.583125 2.6475 0 4.06875 0 5.5875C0 7.10437 0.583125 8.5275 1.64437 9.59625C2.68875 10.6481 4.14 11.2519 5.625 11.2519L5.625 0Z" transform="translate(18.75 16.914375)" id="Path" fill="#CDD0D2" stroke="none" />
            </g>
        </svg>
    )
}

export default SafeIcon