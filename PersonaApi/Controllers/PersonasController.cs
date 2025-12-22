using Microsoft.AspNetCore.Mvc;
using PersonaApi.Models;
using PersonaApi.Services;

namespace PersonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonasController : ControllerBase
    {
        private readonly PersonaService _service;
        public PersonasController(PersonaService service) => _service = service;

        [HttpGet]
        public IActionResult Get() => Ok(_service.GetAll());

        [HttpPost]
        public IActionResult Create([FromBody] Persona persona)
        {
            // FluentValidation valida automáticamente. Si falla, devuelve 400.
            _service.Add(persona);
            return Ok(persona);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Persona persona)
        {
            var existe = _service.GetAll().Any(p => p.Id == id);
            if (!existe) return NotFound();

            persona.Id = id;
            _service.Update(persona);
            return Ok(persona);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return NoContent();
        }
    }
}