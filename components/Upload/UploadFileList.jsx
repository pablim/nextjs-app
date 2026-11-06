import { AiOutlineDelete } from "react-icons/ai";

import styled, { keyframes } from "styled-components";

import Row from "@components/Row/Row";
import FileType from "./FileType";
import Text from "@components/Text/Text";

const DeleteButton = styled(AiOutlineDelete)`
    fill: ${({ theme }) => theme.red};

    :hover {
        cursor: pointer;
        fill: ${({ theme }) => theme.darkRed};
    }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const List = styled(Row)`
    margin: 5px 0;
    border-radius: 4px;
    animation: ${fadeInUp} 0.3s ease-out;
    transition: background 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.superLightGrey};
    }
`;

const UploadFileList = ({ validFiles, removeFile }) => {
    const fileSize = (size) => {
        if (size === 0) {
            return "0 Bytes";
        }
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const fileType = (fileName) => {
        return (
            fileName.substring(
                fileName.lastIndexOf(".") + 1,
                fileName.length,
            ) || fileName
        );
    };

    const filesList = validFiles.map((data, i) => (
        <List key={i}>
            <Row
                style={{
                    justifyContent: "flex-start",
                    flexWrap: "nowrap",
                    width: "90%",
                }}
            >
                <FileType>{fileType(data.name)}</FileType>
                <Text>{data.name}</Text>
                <Text
                    style={{
                        fontSize: "0.8rem",
                        marginLeft: 5,
                        color: "#777676",
                    }}
                >
                    ({fileSize(data.size)})
                </Text>
            </Row>
            <DeleteButton size={24} onClick={() => removeFile(data.name)} />
        </List>
    ));

    return filesList;
};

export default UploadFileList;
