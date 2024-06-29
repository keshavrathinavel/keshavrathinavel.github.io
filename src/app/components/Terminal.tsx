"use client"

import React, { useState } from "react";
import handleCommand from "@/lib/handleCommand";

interface CommandOutput {
    command: string
    result: string | string[]
}

export default function Terminal() {
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<CommandOutput[]>([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = handleCommand(input)

        if (result === null) {
            setInput('')
            return setOutput([])
        }

        setOutput((prevOutput) => [...prevOutput, {command: input, result}])
        setInput('')
    }

    return (
        <div className='ml-4'>
            <div>
                {output.map((output, index) => (
                    <div key={index}>
                        <span className='text-pink-300 font-semibold'><span
                            className='text-green-300'>~</span> learn@about.keshav$ <span
                            className='text-white font-normal'>{output.command}</span></span>
                        <div className='px-4 py-2'>
                            <pre>{Array.isArray(output.result) ? (
                                output.result.map((line, idx) => <div key={idx}>{line}</div>)
                            ) : (
                                <div>{output.result}</div>
                            )}</pre>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <span className='text-pink-300 font-semibold'><span className='text-green-300'>~</span> learn@about.keshav$ </span>
                <input type='text'
                       className='bg-transparent focus:outline-none text-white'
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       autoFocus/>
            </form>
        </div>
    )
}