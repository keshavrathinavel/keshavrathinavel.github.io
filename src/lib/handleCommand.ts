import help from "@/lib/commands/help";
import about from "@/lib/commands/about";
import banner from "@/lib/commands/banner";
import papers from "@/lib/commands/papers";
import hobbies from "@/lib/commands/hobbies";
import skills from "@/lib/commands/skills";


export default function handleCommand(command: string): string[] | null | Map<string, string> {
    switch (command) {
        case 'help':
            return help()
        case 'about':
            return about()
        case 'clear':
            return null
        case 'banner':
            return banner()
        case 'papers':
            return papers()
        case 'skills':
            return skills()
        case 'hobbies':
            return hobbies()
        default:
            return ['Hmmm, no idea what that does. Type "help" to see a list of available commands']
    }
}