import help from "@/lib/commands/help";
import about from "@/lib/commands/about";
import banner from "@/lib/commands/banner";
import hobbies from "@/lib/commands/hobbies";
import skills from "@/lib/commands/skills";
import papers from "@/lib/commands/papers";
import blog from "@/lib/commands/blog";
import experience from "@/lib/commands/experience";
import hepl from "@/lib/commands/hepl";

export default function handleCommand(command: string): string[] | { text: string, url: string }[] | null {
    switch (command) {
        case 'help':
            return help()
        case 'hepl':
            return hepl()
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
        case 'papers':
            return papers()
        case 'blog':
            return blog()
        default:
            return ['Hmmm, no idea what that does. Type "help" to see a list of available commands']
    }
}