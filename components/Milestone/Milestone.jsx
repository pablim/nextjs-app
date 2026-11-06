import styled from "styled-components";

import Connector from "./Connector";

const MilestoneFigureContainer = styled.div`
    display: flex;
    flex-direction: ${({orientation}) => orientation === "vertical" ? 'row' : 'column'};
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const MilestoneFigure = styled.div`
    height: ${({milestoneSize}) => milestoneSize}px;
    width: ${({milestoneSize}) => milestoneSize}px; 
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${({milestoneBorder, completed}) => 
        `${milestoneBorder}px solid ${completed ? 'rgb(114, 34, 130)' : '#ccc'}`};
    background-color: ${({completed}) => 
        completed ? 'rgb(220, 162, 232)' : '#fff'};
    border-radius: ${({milestoneFigure}) => milestoneFigure === "square" ? 0 : '50%'};
    font-size: ${({innerLabelSize}) => innerLabelSize}px;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }
    ${({style}) => style}
`;

const LabelTextContainer = styled.div`
    display: flex; 
    justify-content: center;
    position: relative;
    width: ${({milestoneSize}) => milestoneSize}px;
    text-align: center;
    height: 40px;
`;

const Milestone = ({
        innerLabel,
        innerLabelSize = 8, 
        topLabel,
        bottomLabel,
        completed = false,
        connectorSize = 50,
        connectorLabelSize,
        milestoneSize = 50,
        milestoneBorder = 2,
        milestoneFigure,
        milestoneDescription,
        connectorLabel,
        connectorTopLabel,
        connectorBottomLabel,
        connectorTopLabelSize,
        connectorBottomLabelSize,
        last = false,
        timelineSize,
        connectorAutoSize = false,
        connectorTotal,
        connectorProgress,
        connectorEspessure,
        style = {},
        connectorStyle = {},
        progressStyle = {},
        orientation
    }) => {

        const LabelText = ({milestoneSize, children}) => (
            <LabelTextContainer milestoneSize={milestoneSize}>
                <div style={{height: '20px'}}>{children}</div>
            </LabelTextContainer>   
        )

        return (
            <>
                <MilestoneFigureContainer orientation={orientation}>
                    <LabelText milestoneSize={milestoneSize}>
                        {topLabel}
                    </LabelText>
                    <MilestoneFigure 
                        title={milestoneDescription} 
                        milestoneSize={milestoneSize}
                        milestoneBorder={milestoneBorder}
                        milestoneFigure={milestoneFigure}
                        completed={completed}
                        innerLabelSize={innerLabelSize}
                        style={style}
                    >
                        <div>{innerLabel}</div>
                    </MilestoneFigure>
                    <LabelText milestoneSize={milestoneSize}>
                        {bottomLabel}
                    </LabelText>
                </MilestoneFigureContainer>
                {!last &&
                    <Connector 
                        orientation={orientation}
                        connectorAutoSize={connectorAutoSize}
                        connectorSize={connectorAutoSize 
                            ? (( timelineSize * (milestoneSize + (milestoneBorder * 2)))) 
                            : connectorSize} 
                        timelineSize={timelineSize}
                        label={connectorLabel ? connectorLabel : ''} 

                        connectorLabelSize={connectorLabelSize}
                        connectorEspessure={connectorEspessure}
                        connectorTopLabel={connectorTopLabel} 
                        connectorBottomLabel={connectorBottomLabel}
                        connectorTopLabelSize={connectorTopLabelSize}
                        connectorBottomLabelSize={connectorBottomLabelSize}
                        fake={last}

                        connectorTotal={connectorTotal}
                        connectorProgress={connectorProgress}
                        style={connectorStyle}
                        progressStyle={progressStyle}
                    />
                }
            </>
        )
    }

    export default Milestone;