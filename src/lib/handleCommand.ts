import help from "@/lib/commands/help";
import about from "@/lib/commands/about";
import banner from "@/lib/commands/banner";


export default function handleCommand(command: string) {
    switch (command) {
        case 'help':
            return help()
        case 'about':
            return about()
        case 'clear':
            return null
        case 'banner':
            return banner()
        case 'welcome':
            return banner()
        default:
            return ['Hmmm, no idea what that does. Type "help" to see a list of available commands']
    }
}