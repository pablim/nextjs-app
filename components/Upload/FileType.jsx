import styled from "styled-components";

const FileType = styled.div`
    font-size: 12px;
    margin-right: 10px;
    font-weight: 700;
    line-height: 13px;
    padding: 0 4px;
    border-radius: 2px;
    box-shadow: 1px 1px 2px #abc;
    color: #fff;
    background: ${({ theme }) => theme.purple};
    text-transform: uppercase;
`;

export default FileType;
