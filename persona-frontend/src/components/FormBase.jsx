const FormBase = ({ title, fields, formData, onChange, onSubmit }) => (
    <div className="card shadow border-0 mx-auto" style={{ maxWidth: '450px' }}>
        <div className="card-header bg-primary text-white text-center py-3">
            <h4 className="mb-0 fw-bold">{title}</h4>
        </div>
        <div className="card-body p-4">
            <form onSubmit={onSubmit}>
                {fields.map(field => (
                    <div className="row mb-3 align-items-center" key={field.name}>
                          <div className="col-4 text-end">
                            <label className="fw-bold mb-0">{field.label}:</label>
                        </div>
                       
                        <div className="col-8">
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                className="form-control"
                                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                value={formData[field.name] || ''}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                ))}

                <div className="mt-4">
                    <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm">
                        🚀 Guardar Información
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default FormBase;