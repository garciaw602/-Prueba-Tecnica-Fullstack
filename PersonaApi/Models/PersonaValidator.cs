using FluentValidation;
using PersonaApi.Models;
using PersonaApi.Services;
using System.Linq;

public class PersonaValidator : AbstractValidator<Persona>
{
    public PersonaValidator(PersonaService _service)
    {
        // 1. Reglas Básicas (Siempre obligatorias)
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio");

        // 2. Documento (Solo números)
        RuleFor(x => x.Documento)
            .NotEmpty().WithMessage("El documento es obligatorio")
            .Matches("^[0-9]*$").WithMessage("El documento debe contener solo números") 
            .Must((personaActual, documento) =>
            {
                var existe = _service.GetAll().Any(p =>
                    p.Documento == documento && p.Id != personaActual.Id);
                return !existe;
            })
            .WithMessage("Ya existe una persona registrada con este número de documento.");

        // 3. Formulario A vs B
        // "Apellido es obligatorio si no hay correo"
        RuleFor(x => x.Apellido)
            .NotEmpty().WithMessage("El apellido es obligatorio")
            .When(x => string.IsNullOrEmpty(x.Correo) && string.IsNullOrEmpty(x.Ciudad));

        // 4. Reglas para el Formulario Extendido (Ciudad y Correo)
        // "Si llenas Ciudad, el correo es obligatorio y viceversa"
        RuleFor(x => x.Correo)
            .EmailAddress().WithMessage("El formato del correo no es válido")
            .NotEmpty().WithMessage("El correo es obligatorio en el formulario extendido")
            .When(x => !string.IsNullOrEmpty(x.Ciudad));

        RuleFor(x => x.Ciudad)
            .NotEmpty().WithMessage("La ciudad es obligatoria en el formulario extendido")
            .When(x => !string.IsNullOrEmpty(x.Correo));
    }
}