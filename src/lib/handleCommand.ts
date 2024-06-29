import help from "@/lib/commands/help";
import about from "@/lib/commands/about";


export default function handleCommand(command: string) {
    switch (command) {
        case 'help':
            return help()
        case 'about':
            return about()
        default:
            return ['Hmmm, no idea. Type "help" to see a list of available commands']
    }
}