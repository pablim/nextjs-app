import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "@components/Button";
import ButtonGroup from "@components/ButtonGroup/ButtonGroup";
import Container from "@components/Container/Container";
import { translate } from "../../i18n";
import { PERMISSIONS } from "constants/settings";
import FormContext from "../../context/form";
import useDynamicForm from "hooks/useDynamicForm";
import api from "@services/api";

function Form({
    formId,
    url,
    type, // formdata or json
    files = [],
    setLoading,
    id,
    children,
    setFiles,
    hasPermission = () => {},
}) {
    const navigate = useNavigate();
    const [insertedId, setInsertedId] = useState();
    
    const { 
        fields, 
        setFields, 
        handleInputChange, 
        getRequiredFields,
        objectToFormData, 
    } = useDynamicForm();

    useEffect(() => { id !== "new" && get() }, [id]);
    
    const get = async () => {
        setLoading(true);

        const { data } = await api.get(`${url}/${id}`);

        setFields(data);
        setLoading(false);
    };

    const handlePost = async (body) => {
        try {
            const data = await api.post(`${url}`, body);

            setInsertedId(data.data.id_tech);
            success();
        } catch (error) {
            handleError(error);
        }
    };

    const handlePut = async (body) => {
        try {
            await api.patch(`${url}/${id}`, body);
            success("put");
        } catch (error) {
            handleError(error);
        }
    };

    const handleSubmit = () => {
        setLoading(true);

        const required = getRequiredFields(formId);

        if (required.length > 0) {
            toast.error(translate("requiredFields"));
            setLoading(false);
            return;
        }

        let body;

        if (type === "json" && files.length === 0) { body = { ...fields} } 
        else if (type === "formdata") body = objectToFormData(fields);

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                body.append(`files[]`, files[i]);
            }
        }

        id === "new" ? handlePost(body) : handlePut(body);
    };

    const handleError = (error) => {
        setLoading(false);
        toast.error(error);
    };

    const success = (origin = "post") => {
        toast.success(
            translate(origin === "put" ? "putSuccess" : "postSuccess", {
                app: translate(`Coex.project`),
            }),
        );
        setLoading(false);
        navigate(-1);
    };
    
    const value = {
        fields,
        files,
        setFiles,
        id,
        handleInputChange,
        get
    };

    return (
        <Container id={formId}>
            <FormContext.Provider value={value}>
                {children}
            </FormContext.Provider>

            <ButtonGroup>
                <Button
                    onClick={handleSubmit}
                    disabled={id === "new"
                        ? !hasPermission(PERMISSIONS.CREATE)
                        : !hasPermission(PERMISSIONS.UPDATE)
                    }
                >
                    {id === "new" ? translate("Save") : translate("Update")}
                </Button>
                <Button onClick={() => navigate(-1)}>
                    {translate("Cancel")}
                </Button>
            </ButtonGroup>
        </Container>
    );
}
export default Form;
