import help from "@/lib/commands/help";
import about from "@/lib/commands/about";
import banner from "@/lib/commands/banner";
import hobbies from "@/lib/commands/hobbies";
import skills from "@/lib/commands/skills";


export default function handleCommand(command: string): string[] | null {
    switch (command) {
        case 'help':
            return help()
        case 'about':
            return about()
        case 'clear':
            return null
        case 'banner':
            return banner()
        case 'skills':
            return skills()
        case 'hobbies':
            return hobbies()
        default:
            return ['Hmmm, no idea what that does. Type "help" to see a list of available commands']
    }
}