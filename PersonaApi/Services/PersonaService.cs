using PersonaApi.Models;

namespace PersonaApi.Services
{
    public class PersonaService
    {
        private readonly List<Persona> _personas = new();
        private int _nextId = 1;

        public List<Persona> GetAll() => _personas;

        public void Add(Persona persona)
        {
            persona.Id = _nextId++;
            _personas.Add(persona);
        }

        public void Update(Persona persona)
        {
            var index = _personas.FindIndex(p => p.Id == persona.Id);
            if (index != -1) _personas[index] = persona;
        }

        public void Delete(int id) => _personas.RemoveAll(p => p.Id == id);
    }
}