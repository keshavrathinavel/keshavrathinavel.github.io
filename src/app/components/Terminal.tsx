"use client"

import React, { useEffect, useState } from "react";
import handleCommand from "@/lib/handleCommand";
import { TypeAnimation } from "react-type-animation";

interface CommandOutput {
    command: string | null
    result: string[] | { text: string, url: string }[]
}

export default function Terminal() {
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<CommandOutput[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState<number>(0)
    const [currentOutputIndex, setCurrentOutputIndex] = useState<number>(0)
    const terminalEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bannerResult = handleCommand('banner')
        setOutput([{command: null, result: bannerResult as string[]}])
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = handleCommand(input.toLowerCase())

        if (result === null) {
            setInput('')
            setOutput([])
            setCurrentLineIndex(0)
            setCurrentOutputIndex(0)
            return
        }

        setOutput((prevOutput) => [...prevOutput, {command: input, result} as CommandOutput])
        setInput('')
    }

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({behavior: 'auto'})
    }, [output, currentLineIndex])

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


    const renderResult = (result: string[] | { text: string, url: string }[], outputIndex: number) => {
        if (Array.isArray(result)) {
            return (
                <div>
                    {result.slice(0, outputIndex === currentOutputIndex ? currentLineIndex : result.length).map((line, idx) => (
                        <div key={idx}>
                            {typeof line === 'string' ?
                                (
                                    <TypeAnimation sequence={[line]} speed={99} cursor={false}/>
                                ) : (
                                    <a key={idx} href={line.url} target="_blank" rel="noopener noreferrer"
                                       className='text-cyan-200 decoration-0 decoration-white underline'>
                                        <TypeAnimation sequence={[line.text]} speed={99} cursor={false}/>
                                    </a>
                                )
                            }
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
                        <div className='px-4 py-2' ref={terminalEndRef}>
                            <pre>{renderResult(output.result, index)}</pre>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <span className='text-pink-300 font-semibold'><span className='text-green-300'>~</span> learn@about.keshav$ </span>
                    <input type='text'
                           className='bg-transparent focus:outline-none text-white caret-green-300'
                           value={input}
                           onChange={(e) => setInput(e.target.value)}
                           autoFocus/>
                </form>
            </div>
        </div>
    )
}
