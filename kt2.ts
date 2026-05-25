
interface IFigure {
    readonly id: number;
    readonly shape: string;
    readonly color: string;
}

interface IStatisticsProvider {
    process(figure: IFigure): void;
    getResult(): Record<string, number>;
    getName(): string;
}

class ColorStatistics implements IStatisticsProvider {
    private stats: Record<string, number> = {};

    process(figure: IFigure): void {
        this.stats[figure.color] = (this.stats[figure.color] || 0) + 1;
    }

    getResult() { return this.stats; }
    getName() { return "Статистика по цветам"; }
}

class ShapeStatistics implements IStatisticsProvider {
    private stats: Record<string, number> = {};

    process(figure: IFigure): void {
        this.stats[figure.shape] = (this.stats[figure.shape] || 0) + 1;
    }

    getResult() { return this.stats; }
    getName() { return "Статистика по видам фигур"; }
}


class LogParser {
    
    private static regex = /Фигурка\s+(\d+):\s+([А-ЯЁ]+)\s+([А-ЯЁ]+)/;

    parse(rawLog: string): IFigure[] {
        return rawLog
            .split('\n')
            .map(line => line.trim())
            .filter(line => LogParser.regex.test(line))
            .map(line => {
                const match = line.match(LogParser.regex);
                if (!match) throw new Error("Ошибка формата строки");
                return {
                    id: parseInt(match[1]),
                    shape: match[2],
                    color: match[3]
                };
            });
    }
}

class ConveyorAnalyzer {
    constructor(
        private parser: LogParser,
        private statsProviders: IStatisticsProvider[]
    ) {}

    analyze(rawLog: string): void {
        const figures = this.parser.parse(rawLog);
        
        figures.forEach(figure => {
            this.statsProviders.forEach(provider => provider.process(figure));
        });

        this.displayResults();
    }

    private displayResults(): void {
        this.statsProviders.forEach(provider => {
            console.log(`\n--- ${provider.getName()} ---`);
            console.table(provider.getResult());
        });
    }
}



const rawData = `
Фигурка 1: КУБИК КРАСНЫЙ
Фигурка 2: ШАРИК ЗЕЛЁНЫЙ  
Фигурка 3: ПИРАМИДКА СИНИЙ
Фигурка 4: КУБИК ЖЁЛТЫЙ
Фигурка 5: ШАРИК ФИОЛЕТОВЫЙ
Фигурка 6: ПИРАМИДКА ОРАНЖЕВЫЙ
Фигурка 7: КУБИК ЧЁРНЫЙ
Фигурка 8: ШАРИК БЕЛЫЙ
Фигурка 9: ПИРАМИДКА РОЗОВЫЙ
Фигурка 10: КУБИК ГОЛУБОЙ
Фигурка 11: ШАРИК КРАСНЫЙ
Фигурка 12: ПИРАМИДКА ЗЕЛЁНЫЙ
Фигурка 13: КУБИК СИНИЙ
Фигурка 14: ШАРИК ЖЁЛТЫЙ
Фигурка 15: ПИРАМИДКА ФИОЛЕТОВЫЙ
Фигурка 16: КУБИК ОРАНЖЕВЫЙ
Фигурка 17: ШАРИК ЧЁРНЫЙ
Фигурка 18: ПИРАМИДКА БЕЛЫЙ
Фигурка 19: КУБИК РОЗОВЫЙ
Фигурка 20: ШАРИК ГОЛУБОЙ
Фигурка 21: ПИРАМИДКА КРАСНЫЙ
Фигурка 22: КУБИК ЗЕЛЁНЫЙ
Фигурка 23: ШАРИК СИНИЙ
Фигурка 24: ПИРАМИДКА ЖЁЛТЫЙ
Фигурка 25: КУБИК ФИОЛЕТОВЫЙ
Фигурка 26: ШАРИК ОРАНЖЕВЫЙ
Фигурка 27: ПИРАМИДКА ЧЁРНЫЙ
Фигурка 28: КУБИК БЕЛЫЙ
Фигурка 29: ШАРИК РОЗОВЫЙ
Фигурка 30: ПИРАМИДКА ГОЛУБОЙ
Фигурка 31: КУБИК КРАСНЫЙ
Фигурка 32: ШАРИК ЗЕЛЁНЫЙ
Фигурка 33: ПИРАМИДКА СИНИЙ
Фигурка 34: КУБИК ЖЁЛТЫЙ
Фигурка 35: ШАРИК ФИОЛЕТОВЫЙ
Фигурка 36: ПИРАМИДКА ОРАНЖЕВЫЙ
Фигурка 37: КУБИК ЧЁРНЫЙ
Фигурка 38: ШАРИК БЕЛЫЙ
Фигурка 39: ПИРАМИДКА РОЗОВЫЙ
Фигурка 40: КУБИК ГОЛУБОЙ
Фигурка 41: ШАРИК КРАСНЫЙ
Фигурка 42: ПИРАМИДКА ЗЕЛЁНЫЙ
Фигурка 43: КУБИК СИНИЙ
Фигурка 44: ШАРИК ЖЁЛТЫЙ
Фигурка 45: ПИРАМИДКА ФИОЛЕТОВЫЙ
Фигурка 46: КУБИК ОРАНЖЕВЫЙ
Фигурка 47: ШАРИК ЧЁРНЫЙ
Фигурка 48: ПИРАМИДКА БЕЛЫЙ
Фигурка 49: КУБИК РОЗОВЫЙ
Фигурка 50: ШАРИК ГОЛУБОЙ
Фигурка 51: ПИРАМИДКА КРАСНЫЙ
Фигурка 52: КУБИК ЗЕЛЁНЫЙ
Фигурка 53: ШАРИК СИНИЙ
Фигурка 54: ПИРАМИДКА ЖЁЛТЫЙ
Фигурка 55: КУБИК ФИОЛЕТОВЫЙ
Фигурка 56: ШАРИК ОРАНЖЕВЫЙ
Фигурка 57: ПИРАМИДКА ЧЁРНЫЙ
Фигурка 58: КУБИК БЕЛЫЙ
Фигурка 59: ШАРИК РОЗОВЫЙ
Фигурка 60: ПИРАМИДКА ГОЛУБОЙ
Фигурка 61: КУБИК КРАСНЫЙ
Фигурка 62: ШАРИК ЗЕЛЁНЫЙ
Фигурка 63: ПИРАМИДКА СИНИЙ
Фигурка 64: КУБИК ЖЁЛТЫЙ
Фигурка 65: ШАРИК ФИОЛЕТОВЫЙ
Фигурка 66: ПИРАМИДКА ОРАНЖЕВЫЙ
Фигурка 67: КУБИК ЧЁРНЫЙ
Фигурка 68: ШАРИК БЕЛЫЙ
Фигурка 69: ПИРАМИДКА РОЗОВЫЙ
Фигурка 70: КУБИК ГОЛУБОЙ
Фигурка 71: ШАРИК КРАСНЫЙ
Фигурка 72: ПИРАМИДКА ЗЕЛЁНЫЙ
Фигурка 73: КУБИК СИНИЙ
Фигурка 74: ШАРИК ЖЁЛТЫЙ
Фигурка 75: ПИРАМИДКА ФИОЛЕТОВЫЙ
Фигурка 76: КУБИК ОРАНЖЕВЫЙ
Фигурка 77: ШАРИК ЧЁРНЫЙ
Фигурка 78: ПИРАМИДКА БЕЛЫЙ
Фигурка 79: КУБИК РОЗОВЫЙ
Фигурка 80: ШАРИК ГОЛУБОЙ
Фигурка 81: ПИРАМИДКА КРАСНЫЙ
Фигурка 82: КУБИК ЗЕЛЁНЫЙ
Фигурка 83: ШАРИК СИНИЙ
Фигурка 84: ПИРАМИДКА ЖЁЛТЫЙ
Фигурка 85: КУБИК ФИОЛЕТОВЫЙ
Фигурка 86: ШАРИК ОРАНЖЕВЫЙ
Фигурка 87: ПИРАМИДКА ЧЁРНЫЙ
Фигурка 88: КУБИК БЕЛЫЙ
Фигурка 89: ШАРИК РОЗОВЫЙ
Фигурка 90: ПИРАМИДКА ГОЛУБОЙ
Фигурка 91: КУБИК КРАСНЫЙ
Фигурка 92: ШАРИК ЗЕЛЁНЫЙ
Фигурка 93: ПИРАМИДКА СИНИЙ
Фигурка 94: КУБИК ЖЁЛТЫЙ
Фигурка 95: ШАРИК ФИОЛЕТОВЫЙ
Фигурка 96: ПИРАМИДКА ОРАНЖЕВЫЙ
Фигурка 97: КУБИК ЧЁРНЫЙ
Фигурка 98: ШАРИК БЕЛЫЙ
Фигурка 99: ПИРАМИДКА РОЗОВЫЙ
Фигурка 100: КУБИК ГОЛУБОЙ
`;

const analyzer = new ConveyorAnalyzer(
    new LogParser(),
    [new ColorStatistics(), new ShapeStatistics()]
);

