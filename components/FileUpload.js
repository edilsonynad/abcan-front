import { useState, useEffect } from "react";
import {API_URL} from '@/config/index'
export default function FileUpload({ children, handleAnexoId }) {
  const [PassaporteFile, setPassaporteFile] = useState(null);
  const [NifFile, setNifFile] = useState(null);
  const [CertificadoFile, setCertificadoFile] = useState(null);
  const [FotoFile, setFotoFile] = useState(null);
  const [DeclaracaoFile, setDeclaracaoFile] = useState(null);

  const [passId, setPassId] = useState(null);
  const [nifId, setNifId] = useState(null);
  const [CertId, setCertId] = useState(null);
  const [FotoId, setFotoId] = useState(null);
  const [DeclaId, setDeclaId] = useState(null);

  const [estado, setEstado] = useState(false);
  const [anexo, setAnexo] = useState();

  const handleUploadFiles = async (e) => {
    e.preventDefault();
    /**Upload Passaporte */
    const formDataPass = new FormData();
    formDataPass.append("files", PassaporteFile);

    const resPassaporte = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formDataPass,
    });
    const passporteId = await resPassaporte.json();
    setPassId(passporteId[0].id);

    /**Upload NIF */
    const formDataNif = new FormData();
    formDataNif.append("files", NifFile);

    const resNif = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formDataNif,
    });
    const NifId = await resNif.json();
    setNifId(NifId[0].id);

    /**Upload Certificado */
    const formDataCertificado = new FormData();
    formDataCertificado.append("files", CertificadoFile);

    const resCertificado = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formDataCertificado,
    });
    const CertificadoId = await resCertificado.json();
    setCertId(CertificadoId[0].id);

    /**Upload Foto */
    const formDataFoto = new FormData();
    formDataFoto.append("files", FotoFile);
   
    const resFoto = await fetch(`${API_URL}/upload`, {
       method: "POST",
       body: formDataFoto,
     });
    const FtId = await resFoto.json();
    setFotoId(FtId[0].id);

    /**Upload Foto */
    const formDataDeclaracao = new FormData();
    formDataDeclaracao.append("files", DeclaracaoFile);
   
    const resDeclaracao = await fetch(`${API_URL}/upload`, {
       method: "POST",
       body: formDataDeclaracao,
     });
    const DeclaracaoId = await resDeclaracao.json();
    setDeclaId(DeclaracaoId[0].id);
  };

  useEffect(() => {
    if (passId !== null && nifId !== null && CertId !== null && FotoId !== null && DeclaId !== null) {
      setAnexo({
        Passaporte: {
          id: passId,
        },
        Nif: {
          id: nifId,
        },
        certificado: {
          id: CertId,
        },
        foto: {
          id: FotoId,
        },
        declaracao: {
          id: DeclaId,
        }
      });
      setEstado(true);
    }
  }, [passId, nifId, CertId, FotoId, DeclaId]);

  useEffect(async () => {
    if (estado) {
      const resAnexo = await fetch(`${API_URL}/anexos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anexo),
      });

      const anexoJ = await resAnexo.json();
      handleAnexoId(anexoJ.id);
    }
  }, [estado, anexo]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card-style mb-30">
          <h6 className="mb-25">Documentos necessarios</h6>

          <div className="input-style-1">
            <label>Passporte</label>
            <input
              type="file"
              name="Passaporte"
              id="Passaporte"
              onChange={(e) => {
                setPassaporteFile(e.target.files[0]);
              }}
            />
          </div>

          <div className="input-style-1">
            <label>NIF</label>
            <input
              type="file"
              name="Nif"
              id="Nif"
              onChange={(e) => {
                setNifFile(e.target.files[0]);
              }}
            />
          </div>

          <div className="input-style-1">
            <label>Certificado Apostilado</label>
            <input
              type="file"
              name="certificado"
              id="certificado"
              onChange={(e) => {
                setCertificadoFile(e.target.files[0]);
              }}
            />
          </div>

          <div className="input-style-1">
            <label>Foto</label>
            <input
              type="file"
              name="foto"
              id="foto"
              onChange={(e) => {
                setFotoFile(e.target.files[0]);
              }}
            />
          </div>

          <div className="input-style-1">
            <label>Declaração de honra</label>
            <input
              type="file"
              name="declaracao"
              id="declaracao"
              onChange={(e) => {
                setDeclaracaoFile(e.target.files[0]);
              }}
            />
          </div>
          <button
            class="main-btn primary-btn-outline btn-hover"
            onClick={handleUploadFiles}
          >
            Subir ficheiros
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
