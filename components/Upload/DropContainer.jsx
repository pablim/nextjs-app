import { useRef } from "react";
import styled, { useTheme } from "styled-components";
import { GoInbox } from "react-icons/go";

import Loading from "@components/Loading/Loading";
import { InputFile } from "@components/Input/Input";
import Text from "@components/Text/Text";

const StyledDropContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    margin: 10px 0px;
    width: 100%;
    height: 200px;
    border: 2px dashed ${({ theme }) => theme.lightSilver};
    background-color: ${({ theme }) => theme.white};
    text-align: center;
    transition:
        border 0.3s ease,
        background 0.3s ease;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.superLightGrey};
        border-color: ${({ theme }) => theme.purple};
    }
`;

const DropContainer = ({
    loading,
    validTypes,
    validTypesMessage,
    onFilesSelected,
}) => {
    const fileInputRef = useRef();
    const theme = useTheme();

    const preventDefault = (e) => e.preventDefault();

    const handleDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) onFilesSelected(files);
    };

    const handleFileInputChange = () => {
        if (fileInputRef.current.files.length) {
            onFilesSelected(fileInputRef.current.files);
        }
    };

    const openFileDialog = () => fileInputRef.current.click();

    return (
        <StyledDropContainer
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            onDragLeave={preventDefault}
            onDrop={handleDrop}
            onClick={openFileDialog}
        >
            <Loading loading={loading} absolute />
            <GoInbox
                size={36}
                style={{ marginBottom: 10 }}
                color={theme.purple}
            />
            <Text>{validTypesMessage}</Text>
            <InputFile
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                multiple
                accept={validTypes?.join(",")}
            />
        </StyledDropContainer>
    );
};

export default DropContainer;
