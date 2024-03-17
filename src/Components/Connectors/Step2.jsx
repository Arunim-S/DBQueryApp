import React, { useState, useEffect } from "react";
import ReactJson from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import NextIcon from "../../row1_1_.png";

const Step2 = ({ onSubmit }) => {
  const [schema, setSchema] = useState({});
  const [editorHeight, setEditorHeight] = useState("70vh");

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight > 768 ? "70vh" : "50vh";
      setEditorHeight(height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleJsonChange = (newValue) => {
    setSchema(newValue.json);
  };

  const handleSubmit = () => {
    onSubmit(schema);
  };

  return (
    <div className="bg-[rgb(12,44,84)] w-full max-w-screen-lg mx-auto gap-[1rem] flex flex-col rounded-lg p-8 relative">
      <h2 className="text-[#B0B0B0] text-lg font-bold mb-4">Step 2</h2>
      <p className="text-[#B0B0B0] text-lg mb-6">Provide JSON Schema</p>
      <div className="json-editor" style={{ height: editorHeight }}>
        <ReactJson
          schema={schema}
          locale={locale}
          onChange={handleJsonChange}
          theme="dark_vscode_tribute"
        />
      </div>
      <div className="absolute bottom-0 right-0 p-8 flex items-center justify-end">
        <button
          className="text-[#B0B0B0] flex gap-2 justify-end text-right font-bold rounded w-32"
          onClick={handleSubmit}
        >
          Submit Schema
          <img src={NextIcon} width={23} alt="Next Icon" />
        </button>
      </div>
    </div>
  );
};

export default Step2;
