import { useState } from 'react'
import { Button } from "@/components/ui/button"

// 1. Definição dos Tipos (O "Molde" dos dados que vêm do Java)
interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

interface Person {
  fullName: string;
  cpf: string;
  phoneNumber: string;
  address: Address;
}

function App() {
  // 2. Estado Tipado (Aqui corrigimos o erro 'never')
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(false)

  // 3. Função de Busca
  const handleGenerate = async () => {
    setLoading(true)
    try {
      // Ajuste a URL se necessário (ex: tirar o /api se mudou no Java)
      const response = await fetch('http://localhost:8080/api/person')
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Dados recebidos:", data) // Para debug no F12
      setPerson(data)
      
    } catch (error) {
      console.error("Erro ao conectar:", error)
      alert("Erro ao conectar com o Backend. Verifique se o Java está rodando na porta 8080.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md space-y-4">
        
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Gerador de Pessoas
        </h1>

        {/* Só exibe se 'person' não for nulo */}
        {person && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-slate-200 shadow-xl space-y-4 animate-in fade-in zoom-in duration-300">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white mb-1">{person.fullName}</h2>
              <p className="text-sm text-slate-500">CPF: {person.cpf}</p>
              <p className="text-sm text-slate-500">Tel: {person.phoneNumber}</p>
            </div>

            <div className="space-y-1 text-sm">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Endereço</h3>
              <p>{person.address.street}, {person.address.number}</p>
              <p>{person.address.neighborhood}</p>
              <p>{person.address.city} - {person.address.state}</p>
              <p className="text-slate-500">CEP: {person.address.cep}</p>
            </div>

          </div>
        )}

        <Button 
          onClick={handleGenerate} 
          disabled={loading} 
          className="w-full h-12 text-lg font-semibold"
        >
          {loading ? "Conectando ao Java..." : "Gerar Identidade"}
        </Button>

      </div>
    </div>
  )
}

export default App