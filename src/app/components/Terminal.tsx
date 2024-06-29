"use client"

import { useState, FormEvent } from 'react'
import handleCommand from "@/lib/handleCommand";


export default function Terminal() {
    const [output, setOutput] = useState<string>('')
    const [input, setInput] = useState<string>('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = handleCommand(input)

        if (Array.isArray(result)) {
            setOutput((prevOutput) => `${prevOutput}\n$${input}\n${result.join('\n')}`)
        } else {
            setOutput((prevOutput) => `${prevOutput}\n$${input}\n${result}`)
        }
        setInput('')
    }

    return (
        <div className='bg-transparent text-black'>
            <div>
                {output.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <span>$ </span>
                <input
                    className="bg-transparent"
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>
        </div>
    )
}
