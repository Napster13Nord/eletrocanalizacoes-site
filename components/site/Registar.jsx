'use client'
import { useEffect } from 'react'

// Regista a abertura da página. Não escreve nada no dispositivo — sem cookies,
// sem localStorage, sem sessionStorage — e é por isso que este site não precisa
// de banner de consentimento. As visitas repetidas separam-se no servidor.
export default function Registar({ servico }) {
  useEffect(() => {
    if (!servico?.rastrear) return
    fetch(`${servico.api}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caminho: servico.site, tipo: 'view' }),
      keepalive: true,
    }).catch(() => {})
  }, [servico])

  return null
}
