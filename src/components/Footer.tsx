import { Heart, Github, ExternalLink } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Made with
            </p>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <p className="text-sm text-muted-foreground">
              by
            </p>
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              raihanulislam00
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/raihanulislam00"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Weather data provided by OpenWeatherMap
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 dark:border-slate-700/50">
          <p className="text-xs text-center text-muted-foreground">
            © 2024 Weather App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
