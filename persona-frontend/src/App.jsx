import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormBase from './components/FormBase';

const API_URL = "https://localhost:7194/api/personas";

function AppContent() {
    const navigate = useNavigate();
    const [personasFormA, setPersonasFormA] = useState([]);
    const [personasFormB, setPersonasFormB] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    // Objetos iniciales para limpiar formularios
    const initialA = { nombre: '', apellido: '', documento: '' };
    const initialB = { nombre: '', apellido: '', documento: '', correo: '', ciudad: '' };

    const [dataA, setDataA] = useState(initialA);
    const [dataB, setDataB] = useState(initialB);

    // Manejador de cambios con bloqueo de letras en Documento
    const handleChange = (e, setData) => {
        const { name, value } = e.target;
        if (name === "documento") {
            const soloNumeros = value.replace(/[^0-9]/g, '');
            setData(prev => ({ ...prev, [name]: soloNumeros }));
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Crear o Actualizar
    const handleSubmit = async (e, currentData, setList, resetData, initialData) => {
        e.preventDefault();
        try {
            if (editandoId) {
                const res = await axios.put(`${API_URL}/${editandoId}`, currentData);
                // Actualizar en ambas listas para que la tabla consolidada se refresque
                setPersonasFormA(prev => prev.map(p => p.id === editandoId ? res.data : p));
                setPersonasFormB(prev => prev.map(p => p.id === editandoId ? res.data : p));
                alert(" Registro actualizado correctamente");
                setEditandoId(null);
            } else {
                const res = await axios.post(API_URL, currentData);
                setList(prev => [...prev, res.data]);
                alert(" Registro creado con éxito");
            }
            resetData(initialData);
        } catch (error) {
            let errorMsg = "Ocurrió un error inesperado";
            if (error.response?.data?.errors) {
                errorMsg = Object.values(error.response.data.errors).flat().join("\n");
            } else if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            }
            alert("⚠️ Validación:\n" + errorMsg);
        }
    };

    // Eliminar
    const eliminarPersona = async (id) => {
        if (!window.confirm("¿Deseas eliminar este registro?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            setPersonasFormA(prev => prev.filter(p => p.id !== id));
            setPersonasFormB(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            alert("❌ Error al eliminar el registro");
        }
    };

    // Preparar edición y redireccionar al formulario correcto
    const prepararEdicion = (persona) => {
        setEditandoId(persona.id);

        // Si tiene ciudad o correo, lo mandamos al B
        if (persona.ciudad || persona.correo) {
            setDataB({ ...persona });
            setDataA(initialA);
            navigate('/formB');
        } else {
            setDataA({
                nombre: persona.nombre,
                apellido: persona.apellido,
                documento: persona.documento
            });
            setDataB(initialB);
            navigate('/');
        }
        window.scrollTo(0, 0);
    };

    // Lógica de tabla consolidada (quitar duplicados visuales y filtrar)
    const consolidado = [...personasFormA, ...personasFormB];
    const unicos = consolidado.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    const filtrados = unicos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.documento.includes(busqueda)
    );

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">Sistema de Gestión de Personas</h1>
                <p className="text-muted">Prueba Técnica Fullstack - Wilson García</p>
                <div className="bg-primary mx-auto" style={{ width: '60px', height: '4px' }}></div>
            </div>

            {/* Menú de Navegación */}
            <div className="d-flex justify-content-center mb-5">
                <div className="nav nav-pills shadow-sm p-2 bg-white rounded-pill border">
                    <Link to="/" className="nav-link px-4" onClick={() => { setEditandoId(null); setDataA(initialA); }}>
                        Formulario A (Básico)
                    </Link>
                    <Link to="/formB" className="nav-link px-4" onClick={() => { setEditandoId(null); setDataB(initialB); }}>
                        Formulario B (Extendido)
                    </Link>
                </div>
            </div>

            {/* Rutas de los Formuarios */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-8 col-lg-6">
                    <Routes>
                        <Route path="/" element={
                            <FormBase
                                title={editandoId ? "✏️ Editando Básico" : "📄 Registro Básico (A)"}
                                fields={[
                                    { name: 'nombre', label: 'Nombre' },
                                    { name: 'apellido', label: 'Apellido' },
                                    { name: 'documento', label: 'Documento' }
                                ]}
                                formData={dataA}
                                onChange={(e) => handleChange(e, setDataA)}
                                onSubmit={(e) => handleSubmit(e, dataA, setPersonasFormA, setDataA, initialA)}
                            />
                        } />
                        <Route path="/formB" element={
                            <FormBase
                                title={editandoId ? "✏️ Editando Extendido" : "🚀 Registro Extendido (B)"}
                                fields={[
                                    { name: 'nombre', label: 'Nombre' },
                                    { name: 'apellido', label: 'Apellido' },
                                    { name: 'documento', label: 'Documento' },
                                    { name: 'correo', label: 'Correo Electrónico', type: 'email' },
                                    { name: 'ciudad', label: 'Ciudad' }
                                ]}
                                formData={dataB}
                                onChange={(e) => handleChange(e, setDataB)}
                                onSubmit={(e) => handleSubmit(e, dataB, setPersonasFormB, setDataB, initialB)}
                            />
                        } />
                    </Routes>
                </div>
            </div>

            {/* Tabla de Datos */}
            <div className="card shadow-sm border-0 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold m-0">Listado Consolidado</h4>
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: '300px' }}
                        placeholder="🔍 Buscar por nombre o documento..."
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="table-responsive">
                    <table className="table align-middle table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Documento</th>
                                <th>Información Extra</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrados.length > 0 ? filtrados.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.nombre} {p.apellido}</td>
                                    <td><span className="badge bg-light text-dark border">{p.documento}</span></td>
                                    <td>
                                        <small className="text-muted">
                                            {p.ciudad && `📍 ${p.ciudad}`} {p.correo && ` | 📧 ${p.correo}`}
                                            {!p.ciudad && !p.correo && "N/A"}
                                        </small>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => prepararEdicion(p)}>✏️</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarPersona(p.id)}>🗑️</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">No se encontraron registros.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Componente principal que exporta el Router
export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}