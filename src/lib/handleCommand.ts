import help from "@/lib/commands/help";
import about from "@/lib/commands/about";
import banner from "@/lib/commands/banner";
import hobbies from "@/lib/commands/hobbies";
import skills from "@/lib/commands/skills";
import papers from "@/lib/commands/papers";
import blog from "@/lib/commands/blog";
import experience from "@/lib/commands/experience";
import hepl from "@/lib/commands/hepl";
import code from "@/lib/commands/code.";
import awards from "@/lib/commands/awards";
import social from "@/lib/commands/social";

export default function handleCommand(command: string): string[] | { text: string, url: string }[] | null {
    switch (command) {
        case 'help':
            return help()
        case 'hepl':
            return hepl()
        case 'about':
            return about()
        case 'experience':
            return experience()
        case 'banner':
            return banner()
        case 'skills':
            return skills()
        case 'hobbies':
            return hobbies()
        case 'papers':
            return papers()
        case 'awards':
            return awards()
        case 'blog':
            return blog()
        case 'social':
            return social()
        case 'code':
            return code()
        case 'clear':
            return null
        default:
            return ['Hmmm, no idea what that does. Type "help" to see a list of available commands']
    }
}