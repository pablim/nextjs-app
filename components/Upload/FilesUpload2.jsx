import { useRef } from "react";
import styled from "styled-components";
import { AiOutlineFileAdd } from "react-icons/ai";

import { translate } from "i18n";
import Row from "@components/Row/Row";
import Title from "@components/Title";
import { Hr } from "@components/Hr/Hr";
import Text from "@components/Text/Text";
import Button from "@components/Button";
import { usePermission } from "hooks/usePermission";
import { PERMISSIONS } from "constants/settings";
import UploadArea from "./DropContainer";
import FileList from "@components/FileList";

const HiddenInput = styled.input`
    display: none;
`;

const FilesUpload2 = ({
    files = [],
    setFiles = () => {},
    accept = [],
    multiple = false,
    canUpload = true,
    dropzone = false,
    showPreview,
    thumbnail
}) => {
    const inputRef = useRef(null);
    const { hasPermission } = usePermission();

    const handleFileClick = () => {
        const inputElement = document.getElementById("files-upload-input");
        if (inputElement) inputElement.click();
    };

    const onFieldChange = (data, newData) => {
        if (newData) setFiles([...files, ...data]);
        else setFiles([...data]);
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        onFieldChange(selectedFiles, true);
    };

    const handleFileDelete = (file) => {
        const updatedFiles = files.filter((obj) => obj.name !== file.name);
        onFieldChange(updatedFiles, false);
    };

    const count = files?.length || 0;

    return (
        <>
            {dropzone ? 
                <>
                    <Hr />
                    <UploadArea 
                        onFilesSelected={files => onFieldChange(files, true)} 
                        validTypes={accept}
                        validTypesMessage={ 
                            accept.length > 0 
                                ? translate("acceptedFiles", {files: accept.join(", ")})
                                : translate("acceptedAllFiles")
                        }
                    /> 
                </>
                : (
                    <>
                        <Row style={{ justifyContent: "center" }}>
                            <Title>
                                {translate("files")}
                                {count > 0 && `(${count})`}
                            </Title>
                            {canUpload && (
                                <Button
                                    onClick={handleFileClick}
                                    disabled={!hasPermission(PERMISSIONS.UPLOAD)}
                                >
                                    <AiOutlineFileAdd size={20} />
                                </Button>
                            )}
                        </Row>
                        <Hr />
                        <HiddenInput
                            type="file"
                            id="files-upload-input"
                            ref={inputRef}
                            multiple={multiple}
                            onChange={handleFileChange}
                            accept={accept.join(",")}
                        />
                    </>
            )}

            <FileList files={files} 
                showPreview={showPreview} 
                thumbnail={thumbnail}
                handleDelete={handleFileDelete}
            />

            {files?.length === 0 && (
                <Row style={{ justifyContent: "center" }}>
                    <Text>{translate("noFiles")}</Text>
                </Row>
            )}
        </>
    );
};

export default FilesUpload2;
