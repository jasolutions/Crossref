import { Navigate, useNavigate } from "react-router-dom";
import useXMLFileStore from "./store/useXMLFileStore";

export default function FileUploader({ onFileLoaded }) {
  const { xmlContent, setXMLContent } = useXMLFileStore();

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        setXMLContent(fileContent);
        onFileLoaded(fileContent); //Llama a la función proporcionada por las props
        navigate("/form"); //Redirige al usuario a a la pagina /xml
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        accept="text/xml"
        type="file"
        id="directoryInput"
        onChange={handleFileChange}
      />
      {xmlContent ? (
        <h1>Archivo XML cargado</h1>
      ) : (
        <h1>Seleccione un archivo XML</h1>
      )}
    </div>
  );
}
