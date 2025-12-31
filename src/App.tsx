import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Copy, Check, FileJson } from 'lucide-react'

// Interfaces (Mantidas iguais)
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
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(false)
  // Estado para controlar qual campo foi copiado recentemente (para feedback visual)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Função de Copiar Genérica
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    // Reseta o ícone de "copiado" após 2 segundos
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/person')
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`)
      const data = await response.json()
      setPerson(data)
    } catch (error) {
      console.error("Erro ao conectar:", error)
      alert("Erro ao conectar com o Backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
      
      <div className="w-full max-w-md space-y-6">
        
        <h1 className="text-3xl font-bold text-white text-center tracking-tight">
          Gerador de Pessoas
        </h1>

        {person && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-300">
            
            {/* Cabeçalho */}
            <div className="border-b border-slate-800 pb-5 space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">{person.fullName}</h2>
              
              {/* Linha CPF com Botão de Copiar */}
              <div className="flex items-center justify-between group">
                <p className="text-sm font-medium text-slate-300"> {/* Cor clareada para leitura */}
                  CPF: <span className="font-mono text-slate-100">{person.cpf}</span>
                </p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-slate-400 hover:text-white"
                  onClick={() => copyToClipboard(person.cpf, 'cpf')}
                  title="Copiar CPF"
                >
                  {copiedField === 'cpf' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </Button>
              </div>

              {/* Linha Telefone com Botão de Copiar */}
              <div className="flex items-center justify-between group">
                <p className="text-sm font-medium text-slate-300"> {/* Cor clareada para leitura */}
                  Telefone: <span className="font-mono text-slate-100">{person.phoneNumber}</span>
                </p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-slate-400 hover:text-white"
                  onClick={() => copyToClipboard(person.phoneNumber, 'phoneNumber')}
                  title="Copiar Telefone"
                >
                  {copiedField === 'phoneNumber' ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                </Button>
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-2 text-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Endereço</h3>
              <p className="text-slate-300">{person.address.street}, {person.address.number}</p>
              <p className="text-slate-300">{person.address.neighborhood}</p>
              <p className="text-slate-300">{person.address.city} - {person.address.state}</p>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="text-slate-400 font-semibold">CEP:</span>
                <span className="text-slate-200 font-mono">{person.address.cep}</span>
              </div>
            </div>

            {/* Ações do Card (Copiar JSON) */}
            <div className="pt-2">
               <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white text-xs gap-2"
                  onClick={() => copyToClipboard(JSON.stringify(person, null, 2), 'json')}
               >
                  {copiedField === 'json' ? <Check size={14} className="text-green-500" /> : <FileJson size={14} />}
                  {copiedField === 'json' ? "JSON Copiado!" : "Copiar JSON Completo"}
               </Button>
            </div>

          </div>
        )}

        {/* Botão Principal */}
        <Button 
          onClick={handleGenerate} 
          disabled={loading} 
          className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-slate-200 transition-all"
        >
          {loading ? "Processando..." : "Gerar Identidade"}
        </Button>

      </div>
    </div>
  )
}

export default App