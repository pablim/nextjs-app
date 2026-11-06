import { useState } from "react";
import styled from "styled-components";
import { BsFillCloudCheckFill, BsCloudUpload } from "react-icons/bs";
import { MdDelete, MdDownload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

import Text from "@components/Text/Text";
import { usePermission } from "hooks/usePermission";
import { PERMISSIONS } from "constants/settings";
import { fileDiscovery } from "../../utils/utils"

const ImageContainer = styled.div`
    position: relative;
    display: inline-block;
    border-radius: 20px;
    max-width: 200px;
    max-height: 300px;
    margin: 10px;
    :hover {
        cursor: pointer;
    }
`;

const AddedButton = styled.button`
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #FFFFFFCC;
    color: ${({ theme }) => theme.purple};
    border-radius: 5px;
    border: none;
    cursor: auto;
    padding: 5px 10px;
`;

const AddedButtonList = styled.button`
    display: flex;
    background-color: transparent;
    color: ${({ theme }) => theme.purple};
    border: none;
    cursor: auto;
    padding: 5px 0px;
`;

const DownloadButton = styled.button`
    display: flex;
    position: absolute;
    top: 10px;
    right: 60px;
    background-color: ${({ theme }) => theme.success};
    color: white;
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
`;

const DownloadButtonList = styled(MdDownload)`
    color: ${({ theme }) => theme.purple};
    cursor: pointer;
    position: initial;
`;

const DeleteButton = styled.button`
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${({ theme }) => theme.danger};
    color: white;
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
`;

const DeleteButtonList = styled(AiOutlineDelete)`
    fill: ${({ theme }) => theme.red};
    position: initial;

    :hover {
        cursor: pointer;
        fill: ${({ theme }) => theme.darkRed};
    }
`;

const ImagePreview = styled.img`
    max-width: 200px;
    max-height: 300px;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.purple};
`;

const List = styled.ul`
    margin: 0; 
    padding: 0; 
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${({ thumbnail }) => thumbnail ? "row" : "column"};
    gap: ${({ thumbnail }) => thumbnail ? "0px" : "4px"};
`;

const ItemList = styled.li`
    display: flex;
    alignItems: center;
    cursor: pointer;
    marginBottom: "4px";
`;

const PreviewContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const PreviewImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
`;

const FileName = styled(Text)`
    width: 200px; 
    word-wrap: break-word;
`;

const Item = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`;

const FileList = ({
    files,
    handleDonwload,
    handleDelete = () => {},
    canDelete = true,
    thumbnail = false,
    showPreview = false,
    storedFiles = false,
}) => {
    const { hasPermission } = usePermission();
    const [ show, setShow ] = useState(false);
    const [ fileToShow, setFileToShowShow ] = useState(null);

    const getUrl = (file) => {
        const discovery = fileDiscovery(file);

        if (!discovery) file.url = URL.createObjectURL(file); 
        else file.url = discovery;

        return file;
    };

    const toggleShow = () => setShow(prev => !prev)

    const download = (file_path) => handleDonwload(file_path, file_path) 

    const handlePreview = (file_path) => {
        setFileToShowShow(file_path);
        showPreview ? toggleShow() : () => download(file_path);
    }

    const disableDelete = () => !hasPermission(PERMISSIONS.DELETE)
    
    const Preview = ({ file }) => show && fileToShow === file.path && (
        <PreviewContainer onClick={toggleShow} >
            <PreviewImage src={file.url} alt="Preview" />
            <Text>{file.fileName}</Text>
        </PreviewContainer>
    )

    const ThumbItem = ({ file }) => (
        <ImageContainer>
            <ImagePreview
                src={file.url}
                alt="Image Preview"
                onClick={() => handlePreview(file.path)}
            />
            
            <AddedButton>
                {storedFiles 
                    ? <BsFillCloudCheckFill size={20} /> 
                    : <BsCloudUpload size={20} />}
            </AddedButton>
        
            <div style={{ display: "flex" }}>
                <FileName onClick={() => download(file.path)}>
                    {file.filename}
                </FileName>

                {handleDonwload &&
                    <DownloadButton onClick={() => download(file.path)}>
                        <MdDownload size={20} />
                    </DownloadButton>
                }

                {canDelete && (
                    <DeleteButton
                        onClick={() => {handleDelete(file.file)}}
                        disabled={disableDelete()}
                    >
                        <MdDelete size={20} />
                    </DeleteButton>
                )}
            </div>

            <Preview file={file} />
        </ImageContainer>
    )

    const InlineItem = ({ file }) => (
        <Item>
            <AddedButtonList>
                {storedFiles 
                    ? <BsFillCloudCheckFill size={20} /> 
                    : <BsCloudUpload size={20} />}
            </AddedButtonList>

            <a onClick={() => handlePreview(file.path)}> {file.fileName} </a>

            {handleDonwload &&
                <DownloadButtonList onClick={() => download(file.path)} >
                    <MdDownload size={20} />
                </DownloadButtonList>
            }

            {canDelete && (
                <DeleteButtonList 
                    onClick={() => handleDelete(file.file)}
                    disabled={disableDelete()}
                >
                    <AiOutlineDelete />
                </DeleteButtonList>
            )}

            <Preview file={file} />
        </Item>
    )

    /**
     * File -> File Brownser
     * ​{
     *  ​lastModified: 1773928384171
     *  ​​name: "teste.png"
     *  ​​size: 50736
     *  ​​type: "image/png"
     *  ​​webkitRelativePath: ""
     * }
     */
    const getFileProps = (file) => {
        // name quando vem do file browser, file_path quando vem do backend
        const splitFilename = 
            file?.file_path?.split("/") || file?.name?.split("/");

        return {
            fileName: splitFilename?.[splitFilename?.length - 1],
            url: getUrl(file).url,
            path: file.file_path,
            file
        }
    }

    return files?.length ? (
        
        <List thumbnail={thumbnail}>
            {files.map((file, i) => {
                const fileProps = getFileProps(file);

                return (
                    <ItemList key={i} >
                        {thumbnail 
                            ? <ThumbItem key={i} file={fileProps}/> 
                            : <InlineItem key={i} file={fileProps} />
                        }
                    </ItemList>
                );
            })}
        </List>
    ) : <></>;
};

export default FileList;
