import styled from "styled-components";

const ConnectorLineContainer = styled.div`
    position: relative;
    display: flex; 
    flex-direction: column; 
    font-size: ${({connectorLabelSize}) => connectorLabelSize}px; 
    align-items: center;
    justify-content: center;

    width: ${({orientation, connectorAutoSize, connectorSize, timelineSize}) => 
        orientation === "vertical" ? 'none' :
        connectorAutoSize 
            ? `calc((100% - ${(connectorSize)}px) / ${timelineSize-1})` 
            : `${connectorSize}px`};
`;

const ConnectorLine = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${({orientation, connectorEspessure}) => orientation === "vertical" 
        ? '80' : connectorEspessure}px;
    width: ${({orientation, connectorEspessure}) => orientation === "vertical" 
        ? connectorEspessure + 'px' : '100%'};
    margin: 0;
    background-color: #ccc;
    ${({fake}) => fake 
        ? 'color: transparent; background-color: transparent; border: none;' 
        : ''}  
    &:hover {
        cursor: pointer;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }

    ${({style}) => style}
`;

const ProgressLine = styled.hr`
    height: ${({
            orientation, 
            connectorProgress, 
            connectorTotal, 
            connectorEspessure
    }) => orientation === "vertical" 
        ? ((connectorProgress*100)/connectorTotal) > 100 
            ? '100%' 
            : (connectorProgress*100)/connectorTotal + '%'
        : connectorEspessure + "px"}; 

    width: ${({
        orientation, 
        connectorProgress, 
        connectorTotal, 
        connectorEspessure
    }) => orientation === "vertical" 
        ? connectorEspessure + 'px' 
        : ((connectorProgress*100)/connectorTotal) > 100 
            ? '100%' 
            : (connectorProgress*100)/connectorTotal + '%'};

    margin: 0;
    border: none;
    background-color: rgb(114, 34, 130);
    align-self: start;
    ${({fake}) => fake 
        ? 'color: transparent; background-color: transparent; border: none;' 
        : ''}
    
    ${({style}) => style}
`;

const Connector = ({
    connectorAutoSize,
    connectorSize = 50, 
    timelineSize = 1,
    connectorLabelSize = 12, 
    connectorTopLabel,
    connectorBottomLabel,
    connectorTopLabelSize,
    connectorBottomLabelSize,
    connectorEspessure = 2,
    fake = false,
    connectorTotal,
    connectorProgress,
    style = {},
    progressStyle = {},
    orientation
}) => {
    
    const completed = (connectorTotal - (connectorTotal-connectorProgress)) > connectorTotal ? 
        connectorTotal : 
        connectorTotal - (connectorTotal-connectorProgress);
    
    const remain = connectorTotal-connectorProgress > connectorTotal ? 
        connectorTotal : 
        connectorTotal-connectorProgress

    const Label = ({children, labelPostion = 'top'}) =>  {
        return (
            (!fake) && <div style={{
                position: 'absolute', 
                ...(labelPostion == 'top' ? {bottom: '10px'} : {top: '10px'}),
                ...(labelPostion == 'top' && connectorTopLabelSize 
                    ? {fontSize: connectorTopLabelSize} : {}),
                ...(labelPostion == 'bottom' && connectorBottomLabelSize 
                    ? {fontSize: connectorBottomLabelSize} : {}),

                ...(labelPostion == 'left' && {right: '-10px', top: 'unset'}),
                ...(labelPostion == 'right' && 
                    {left: '-10px', top: 'unset', textAlign: 'right'}),
                ...((labelPostion == 'left' || labelPostion == 'right') && 
                    {width: '100px'}),
                
                }}
            >
                {children}
            </div>
        )
    }

    return (
        <ConnectorLineContainer 
            connectorLabelSize={connectorLabelSize}
            connectorAutoSize={connectorAutoSize}
            connectorSize={connectorSize}
            timelineSize={timelineSize}
            orientation={orientation}
            
        >
            <Label labelPostion={orientation === 'vertical' ? 'left' : 'top'}>
                {connectorTopLabel}
            </Label>
            <ConnectorLine title={remain + ' days'} 
                connectorEspessure={connectorEspessure} 
                fake={fake}
                style={style}
                orientation={orientation}
            >
                <ProgressLine title={completed + ' days'} 
                    connectorEspessure={connectorEspessure} 
                    connectorProgress={connectorProgress}
                    connectorSize={connectorSize}
                    connectorTotal={connectorTotal}
                    fake={fake}
                    style={progressStyle}
                    orientation={orientation}
                />
            </ConnectorLine>
            <Label labelPostion={orientation === 'vertical' ? 'right' : 'bottom'}>
                {connectorBottomLabel}
            </Label>
        </ConnectorLineContainer>
    )
}

export default Connector;