import HelpButton from "@components/HelpButton";
import { Input, Select, TextArea } from "@components/Input/Input";
import MultiSelect from "@components/Input/MultiSelect";
import RadioButton from "@components/RadioButton/RadioButton";
import CheckBox from "@components/CheckBox";
import Text from "@components/Text/Text";
import FilesUpload from "@components/Upload/FilesUpload";
import FilesUpload2 from "@components/Upload/FilesUpload2";
import FileList from "@components/FileList";
import CharCount from "@components/CharCount/CharCount";
import { translate } from "../../i18n";

const Field = ({
    id,
    type,
    value,
    name,
    required = false,
    disabled = false,
    label,
    helpInfo,
    handleChange = () => {},
    values = [],
    rows = 3,
    maxLength = 2000,
    checked = false,
    options = [],
    containerStyle = {},
    style = {},
    className = "",

    charCount = true,

    // file2AndList specific props
    uploadedFiles,
    isFilesLoading,
    thumbnailList,
    showPreviewList,
    storedFilesList,
    handleDeleteFile,
    handleDonwload,

    // file2
    files,
    setFiles,
    multiple,
    preview,
    dropzone,
    accept,
    showPreview,
    thumbnail,

    // files upload specific props
    addedFiles,
    handleFileChange,
    handleFileDelete,
    handleFileDownload,
    canDelete,
    validTypes,
}) => {
    const isInput =
        type === "text" ||
        type === "date" ||
        type === "number" ||
        type === "email" ||
        type === "password" ||
        type === "" ||
        !type;

    const isSelect = type === "select";
    const isMultiSelect = type === "multiselect";
    const isTextArea = type === "textarea";
    const upload = type === "upload";
    const uploadList = type === "uploadList";
    const isFile = type === "file";
    const isCheckbox = type === "checkbox";
    const isRadio = type === "radio";

    required = required ? "required" : "";
    disabled = disabled ? "disabled" : "";

    const inLineRequiredStyle =
        label || isFile || upload || uploadList
            ? { flexDirection: "column" }
            : { flexDirection: "row" };

    return (
        <div style={{ width: "100%", display: "flex", ...inLineRequiredStyle }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {label && <Text required={required}>{label}</Text>}
                {helpInfo && <HelpButton info={helpInfo}>?</HelpButton>}
            </div>

            {isInput && (
                <Input
                    id={id}
                    className={className}
                    style={style}
                    type={type}
                    defaultValue={value}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                />
            )}
            {isSelect && (
                <Select
                    id={id}
                    style={style}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                >
                    <option>{translate("chooseOption")}</option>
                    {options.map((option) => (
                        <option
                            key={
                                option && option?.value ? option.value : option
                            }
                            value={
                                option && option?.value ? option.value : option
                            }
                        >
                            {option && option?.label ? option.label : option}
                        </option>
                    ))}
                </Select>
            )}
            {isMultiSelect && (
                <MultiSelect
                    options={options}
                    onChange={handleChange}
                    values={values}
                />
            )}
            {isTextArea && (
                <div style={containerStyle}>
                    <TextArea
                        id={id}
                        style={style}
                        defaultValue={value}
                        onChange={handleChange}
                        maxLength={maxLength}
                        required={required}
                        rows={rows}
                        disabled={disabled}
                    />
                    {charCount && <CharCount for={id} />}
                </div>
            )}
            {uploadList && (
                <>
                    {isFilesLoading ? (
                        <>Loading files...</>
                    ) : (
                        <FileList
                            files={uploadedFiles}
                            handleDonwload={handleDonwload}
                            handleDelete={handleDeleteFile}
                            thumbnail={thumbnailList}
                            showPreview={showPreviewList}
                            storedFiles={storedFilesList}
                        />
                    )}

                    <FilesUpload2
                        files={files}
                        setFiles={setFiles}
                        multiple={multiple}
                        preview={preview}
                        dropzone={dropzone}
                        accept={accept}
                        showPreview={showPreview}
                        thumbnail={thumbnail}
                    />
                </>
            )}
            {upload && (
                <FilesUpload2
                    files={files}
                    setFiles={setFiles}
                    multiple={multiple}
                    preview={preview}
                    dropzone={dropzone}
                    accept={accept}
                    showPreview={showPreview}
                    thumbnail={thumbnail}
                />
            )}
            {isFile && (
                <FilesUpload
                    files={files}
                    addedFiles={addedFiles}
                    handleFileChange={handleFileChange}
                    handleFileDelete={handleFileDelete}
                    handleFileDownload={handleFileDownload}
                    canDelete={canDelete}
                    validTypes={validTypes}
                    multiple={multiple}
                />
            )}
            {isCheckbox && (
                <CheckBox
                    id={id}
                    name={name}
                    label={label}
                    checked={checked}
                    onChange={handleChange}
                />
            )}
            {isRadio && (
                <RadioButton
                    label={label}
                    onChange={handleChange}
                    value={value}
                />
            )}

            {!label && (
                <div
                    style={{
                        margin: "0px 4px",
                        color: required ? "inherit" : "transparent",
                    }}
                >
                    *
                </div>
            )}
        </div>
    );
};

export default Field;
