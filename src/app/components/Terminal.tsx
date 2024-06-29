"use client"

import React, { useState, useEffect } from "react";
import handleCommand from "@/lib/handleCommand";
import { TypeAnimation } from "react-type-animation";

interface CommandOutput {
    command: string
    result: string | string[]
}

export default function Terminal() {
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<CommandOutput[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState<number>(0)
    const [currentOutputIndex, setCurrentOutputIndex] = useState<number>(0)

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

    useEffect(() => {
        if (currentOutputIndex < output.length) {
            const result = output[currentOutputIndex].result;
            if (Array.isArray(result) && currentLineIndex < result.length) {
                const timer = setTimeout(() => {
                    setCurrentLineIndex(currentLineIndex + 1)
                }, 75);

                return () => clearTimeout(timer)
            } else if (!Array.isArray(result) || currentLineIndex >= result.length) {
                const timer = setTimeout(() => {
                    setCurrentOutputIndex(currentOutputIndex + 1)
                    setCurrentLineIndex(0)
                }, 0);

                return () => clearTimeout(timer)
            }
        }
    }, [currentLineIndex, currentOutputIndex, output])

    const renderResult = (result: string | string[], outputIndex: number) => {
        if (Array.isArray(result)) {
            return (
                <div>
                    {result.slice(0, outputIndex === currentOutputIndex ? currentLineIndex : result.length).map((line, idx) => (
                        <div key={idx}>
                            <TypeAnimation sequence={[line]} speed={99} cursor={false}/>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    <TypeAnimation sequence={[result]} speed={99} cursor={false}/>
                </div>
            )
        }
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
                            <pre>{renderResult(output.result, index)}</pre>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <span className='text-pink-300 font-semibold'><span className='text-green-300'>~</span> learn@about.keshav$ </span>
                <input type='text'
                       className='bg-transparent focus:outline-none text-white caret-green-300'
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       autoFocus/>
            </form>
        </div>
    )
}
