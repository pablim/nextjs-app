import styled from "styled-components";

import Milestone from "./Milestone";

const ProgressMilestoneConteiner = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: ${({orientation}) => orientation === "vertical" 
        ? 'column' : 'row'
    };
    align-items: center;
    justify-content: center;
    gap: ${({connectorSpace}) => connectorSpace}px;
    ${({style}) => style}
`;

/**
 * ProgressMilestone Component
 * 
 * Displays a timeline of milestones with visual connectors, showing progress 
 * and details for each stage.
 * 
 * @param {Object[]} data - Array of milestone objects. Each object should contain:
 *   @property {string|number} id - Unique identifier for the milestone.
 *   @property {string} innerLabel - Text displayed inside the milestone (e.g., formatted date).
 *   @property {string} bottomLabel - Text displayed below the milestone (e.g., "X days so far").
 *   @property {string} topLabel - Text displayed above the milestone (e.g., stage name).
 *   @property {string} milestoneDescription - Description of the milestone (e.g., "X days left for this date").
 *   @property {boolean} completed - Indicates if the milestone has been reached.
 *   @property {number} connectorTotal - Total days between consecutive milestones.
 *   @property {number} connectorProgress - Current progress in days between milestones.
 *   @property {string} connectorTopLabel - Text displayed above the connector (e.g., "X days").
 *   @property {string} connectorBottomLabel - Text displayed below the connector.
 * 
 * @param {Object} layout - Visual configuration for the component.
 *   @property {number} innerLabelSize - Font size for the milestone's inner label.
 *   @property {number} connectorSpace - Space between connectors.
 *   @property {number} milestoneSize - Size of the milestone.
 *   @property {number} milestoneBorder - Border thickness of the milestone.
 *   @property {number} connectorSize - Size of the connector.
 *   @property {number} connectorLabelSize - Font size for connector labels.
 *   @property {number} connectorTopLabelSize - Font size for the connector's top label.
 *   @property {number} connectorBottomLabelSize - Font size for the connector's bottom label.
 *   @property {number} connectorEspessure - Thickness of the connector.
 * 
 * @param {Object} style - Custom styles for the main container.
 * @param {Object} milestoneStyle - Custom styles for each milestone.
 * @param {Object} connectorStyle - Custom styles for each connector.
 * @param {Object} progressStyle - Custom styles for the connector's progress bar.
 * 
 * @returns {JSX.Element} Visual timeline of milestones.
 * 
 * @example
 * <ProgressMilestone
 *   data={[
 *     {
 *       id: 1,
 *       innerLabel: "01/09/2025",
 *       bottomLabel: "5 days so far",
 *       topLabel: "Start",
 *       milestoneDescription: "10 days left for this date",
 *       completed: true,
 *       connectorTotal: 15,
 *       connectorProgress: 5,
 *       connectorTopLabel: "15 days",
 *       connectorBottomLabel: "",
 *       firstLabel: "teste first label",
 *       lastLabel: "teste last label",
 *     },
 *     // ...other milestones
 *   ]}
 *   layout={{
 *     innerLabelSize: 14,
 *     connectorSpace: 8,
 *     milestoneSize: 90,
 *     milestoneBorder: 4,
 *     milestoneFigure: "",
 *     connectorSize: 80,
 *     connectorLabelSize: 14,
 *     connectorTopLabelSize: 14,
 *     connectorBottomLabelSize: 14,
 *     connectorEspessure: 4,
 *     connectorAutoSize: true,
 *     orientation: ''
 *   }}
 *   style={{ background: "#f5f5f5" }}
 *   milestoneStyle={{ borderColor: "#722282" }}
 *   connectorStyle={{ backgroundColor: "#ccc" }}
 *   progressStyle={{ backgroundColor: "#722282" }}
 */
const ProgressMilestone = ({
    data = [],
    layout = {},
    style = {},
    milestoneStyle = {},
    connectorStyle = {},
    progressStyle = {},
}) => { 
    return (
        <ProgressMilestoneConteiner 
            connectorSpace={layout?.connectorSpace}
            orientation={layout?.orientation}
            style={style}
        >
            {data.length > 0 && data[0].firstLabel &&
                <div>{data[0].firstLabel}</div>
            }
            {data.map((milestone) => (
                <Milestone 
                    id={milestone?.id} 
                    key={milestone?.id} 
                    orientation={layout?.orientation}
                    
                    bottomLabel={milestone?.bottomLabel}
                    topLabel={milestone?.topLabel}
                    innerLabel={milestone?.innerLabel} 
                    innerLabelSize={layout?.innerLabelSize}

                    milestoneDescription={milestone?.milestoneDescription}
                    completed={milestone?.completed} 
                    last={milestone === data[data.length -1]}
                    timelineSize={data.length}
                    milestoneSize = {layout?.milestoneSize}
                    milestoneBorder = {layout?.milestoneBorder}
                    milestoneFigure = {layout?.milestoneFigure}

                    connectorTopLabel={milestone?.connectorTopLabel}
                    connectorBottomLabel={milestone?.connectorBottomLabel}
                    connectorTotal={milestone?.connectorTotal}
                    connectorProgress={milestone?.connectorProgress}
                    connectorSpace={layout?.connectorSpace}
                    connectorAutoSize={layout?.connectorAutoSize}
                    connectorSize={layout?.connectorSize}
                    connectorLabelSize={layout?.connectorLabelSize}
                    connectorTopLabelSize={layout?.connectorTopLabelSize}
                    connectorBottomLabelSize={layout?.connectorBottomLabelSize}
                    connectorEspessure={layout?.connectorEspessure}

                    style={milestoneStyle}
                    connectorStyle={connectorStyle}
                    progressStyle={progressStyle}
                />
            ))}
            {data.length > 0 && data[data.length-1].lastLabel &&
                <div>{data[data.length-1].lastLabel}</div>
            }
        </ProgressMilestoneConteiner>
    )
}

export default ProgressMilestone;