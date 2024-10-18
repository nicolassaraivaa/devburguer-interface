import styled from "styled-components";

export const Container = styled.div`
    .carousel-item{
        padding-right: 40px;
    }

    .react-multi-carousel-list{
        overflow: visible;
    }

    overflow-x: hidden;
    padding-left: 30px;
    padding-bottom: 40px;

`

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color:#61a120;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin: 70px 0px;

    &::after{
        content: '';
        position: absolute;
        width: 56px;
        height: 4px;
        background-color: #61a120;
        bottom: 0;
        left: calc(50% - 28px);
    }
`

