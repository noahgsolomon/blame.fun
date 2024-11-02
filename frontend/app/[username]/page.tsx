"use client";

import * as React from "react";
import {
  CalendarDays,
  MapPin,
  Link2,
  Users,
  Star,
  GitFork,
  BookOpen,
  Search,
  Coins,
  Rocket,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Image,
  RefreshCcw,
  TrendingUp,
  ArrowUpDown,
  TrendingDown,
  Wallet,
  Droplet,
  Target,
  Shield,
  AlertTriangle,
  ChartBar,
  Percent,
  Award,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: number;
  type: "buy" | "sell";
  amount: number;
  tokenSymbol: string;
  price: number;
  date: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ContributionCalendar = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Mock data for the contribution calendar
  const generateMockData = () => {
    const data = [];
    for (let i = 0; i < 53 * 7; i++) {
      data.push(Math.floor(Math.random() * 5));
    }
    return data;
  };

  const contributionData = generateMockData();

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count < 2) return "bg-green-100 dark:bg-green-900";
    if (count < 3) return "bg-green-300 dark:bg-green-700";
    if (count < 4) return "bg-green-500 dark:bg-green-500";
    return "bg-green-700 dark:bg-green-300";
  };

  return (
    <div className="mt-6">
      <div className="flex gap-4">
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <p className="text-xs text-muted-foreground">3,322 contributions</p>
          <div
            style={{ width: "max-content" }}
            className="border p-1 rounded-lg grid grid-cols-[repeat(53,1fr)] gap-1"
          >
            {contributionData.map((count, index) => (
              <TooltipProvider delayDuration={100} key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`w-3 h-3 rounded-sm ${getContributionColor(
                        count
                      )}`}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {count} contributions on {new Date().toDateString()}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <Button variant="link">2024</Button>
          <Button variant="link">2023</Button>
          <Button variant="link">2022</Button>
          <Button variant="link">2021</Button>
        </div>
      </div>
    </div>
  );
};

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  tokenSymbol: string;
  tokenPrice: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  topHoldersPercent: number;
  snipersCount: number;
  maxSnipers: number;
  blueChipPercent: number;
  rugpullRisk: string;
  auditScore: number;
  maxAuditScore: number;
  priceChange24h: number;
  tokenHistory: { date: string; price: number }[];
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
}

const RepositoryList = ({ repositories }: { repositories: Repository[] }) => {
  return (
    <div className="space-y-4">
      {repositories.map((repo) => (
        <Card key={repo.id} className="flex flex-col h-full">
          <CardHeader className="flex-grow">
            <div className="flex justify-between items-start">
              <CardTitle className="text-blue-500 hover:underline cursor-pointer text-lg flex items-center">
                {repo.name}
              </CardTitle>
              <AssetSheet repo={repo} />
            </div>
            <CardDescription className="text-sm mt-1">
              {repo.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground mb-4">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
              <span className="mr-4">{repo.language}</span>
              <Star className="mr-1 h-3 w-3" />
              <span className="mr-4">{repo.stars}</span>
              <GitFork className="mr-1 h-3 w-3" />
              <span>{repo.forks}</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {/* Price Change */}
              <TokenBadge
                icon={repo.priceChange24h >= 0 ? TrendingUp : TrendingDown}
                value={`${repo.priceChange24h >= 0 ? "+" : ""}${
                  repo.priceChange24h
                }%`}
                colorClass={
                  repo.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                }
                tooltip="24h price change"
              />

              {/* Market Cap */}
              <TokenBadge
                icon={ChartBar}
                label="MC"
                value={`$${(repo.marketCap / 1000000).toFixed(1)}M`}
                colorClass="text-blue-500"
                tooltip="Market Capitalization"
              />

              {/* Liquidity */}
              <TokenBadge
                icon={Droplet}
                label="Liq"
                value={`$${(repo.liquidity / 1000).toFixed(0)}K`}
                colorClass="text-cyan-500"
                tooltip="Available Liquidity"
              />

              {/* Snipers */}
              <TokenBadge
                icon={Target}
                value={`${repo.snipersCount}/${repo.maxSnipers}`}
                colorClass={
                  repo.snipersCount >= repo.maxSnipers * 0.8
                    ? "text-orange-500"
                    : "text-blue-500"
                }
                tooltip="Active snipers / Max snipers"
              />

              {/* Blue Chip % */}
              <TokenBadge
                icon={Award}
                label="BC"
                value={`${repo.blueChipPercent}%`}
                colorClass={
                  repo.blueChipPercent > 50
                    ? "text-purple-500"
                    : "text-gray-500"
                }
                tooltip="Blue Chip Percentage"
              />

              {/* Rugpull Risk */}
              <TokenBadge
                icon={Shield}
                value={repo.rugpullRisk}
                colorClass={
                  repo.rugpullRisk === "Low"
                    ? "text-green-500"
                    : repo.rugpullRisk === "Unknown"
                    ? "text-yellow-500"
                    : "text-red-500"
                }
                tooltip="Rugpull Risk Assessment"
              />

              {/* Holders */}
              <TokenBadge
                icon={Users}
                value={`${(repo.holders / 1000).toFixed(1)}K`}
                colorClass="text-indigo-500"
                tooltip="Total Token Holders"
              />

              {/* Top Holders */}
              <TokenBadge
                icon={Percent}
                label="Top10"
                value={`${repo.topHoldersPercent}%`}
                colorClass={
                  repo.topHoldersPercent > 80
                    ? "text-red-500"
                    : repo.topHoldersPercent > 60
                    ? "text-yellow-500"
                    : "text-green-500"
                }
                tooltip="Percentage held by top 10 holders"
              />

              {/* Audit Score */}
              <TokenBadge
                icon={AlertTriangle}
                label="Safe"
                value={`${repo.auditScore}/${repo.maxAuditScore}`}
                colorClass={
                  repo.auditScore / repo.maxAuditScore >= 0.8
                    ? "text-green-500"
                    : repo.auditScore / repo.maxAuditScore >= 0.6
                    ? "text-yellow-500"
                    : "text-red-500"
                }
                tooltip="Security Audit Score"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ReadmeSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          cryptodev / README.md
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <h1>👋 Hi, I'm CryptoDev</h1>
          <p>
            I'm a blockchain enthusiast and open-source developer. I love
            building decentralized tools that empower developers and users
            alike.
          </p>
          <h2>🚀 Featured Projects</h2>
          <ul>
            <li>
              <a href="#">decentra-git</a> - A decentralized git hosting
              platform with built-in token economics.
            </li>
            <li>
              <a href="#">web3-collab</a> - Collaborative coding environment
              powered by blockchain technology.
            </li>
          </ul>
          <h2>📫 Get in touch</h2>
          <p>
            <a href="#">Twitter</a> •<a href="#">GitHub</a> •
            <a href="#">DecentraGit</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const TokenPriceChart = ({
  tokenHistory,
}: {
  tokenHistory: { date: string; price: number }[];
}) => {
  return (
    <ChartContainer
      config={{
        price: {
          label: "Token Price",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px]"
    >
      <LineChart data={tokenHistory}>
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="price" stroke="var(--color-price)" />
      </LineChart>
    </ChartContainer>
  );
};

const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {transaction.type === "buy" ? (
                <span className="flex items-center text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  Buy
                </span>
              ) : (
                <span className="flex items-center text-red-500">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  Sell
                </span>
              )}
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.tokenSymbol}</TableCell>
            <TableCell>${transaction.price.toFixed(2)}</TableCell>
            <TableCell>{transaction.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const AssetSheet = ({ repo }: { repo: Repository }) => {
  const [swapAmount, setSwapAmount] = React.useState("");
  const [swapDirection, setSwapDirection] = React.useState<"buy" | "sell">(
    "buy"
  );

  const estimatedOutput = React.useMemo(() => {
    const amount = parseFloat(swapAmount) || 0;
    return swapDirection === "buy"
      ? (amount / repo.tokenPrice).toFixed(4)
      : (amount * repo.tokenPrice).toFixed(2);
  }, [swapAmount, swapDirection, repo.tokenPrice]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Swap
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>
            {repo.name} ({repo.tokenSymbol})
          </SheetTitle>
          <SheetDescription>
            Swap tokens for {repo.tokenSymbol}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Token Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-2xl font-bold">
                ${repo.tokenPrice.toFixed(4)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p className="text-lg font-semibold text-green-500">+5.67%</p>
            </div>
          </div>

          {/* Price Chart */}
          <div>
            <h3 className="font-semibold mb-2">Price Chart</h3>
            <div className="h-[200px]">
              <TokenPriceChart tokenHistory={repo.tokenHistory} />
            </div>
          </div>

          {/* Swap Interface */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">
                  You {swapDirection === "buy" ? "pay" : "sell"}
                </label>
                <span className="text-sm text-muted-foreground">
                  Balance: 1,000{" "}
                  {swapDirection === "buy" ? "USD" : repo.tokenSymbol}
                </span>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    setSwapDirection(swapDirection === "buy" ? "sell" : "buy")
                  }
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">You receive</label>
                <span className="text-sm text-muted-foreground">
                  ≈ {estimatedOutput}{" "}
                  {swapDirection === "buy" ? repo.tokenSymbol : "USD"}
                </span>
              </div>
            </div>

            <Button className="w-full" size="lg">
              {swapDirection === "buy" ? "Buy" : "Sell"} {repo.tokenSymbol}
            </Button>
          </div>

          {/* Token Stats */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-sm">Market Cap</span>
              <span className="text-sm font-medium">
                ${repo.marketCap.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">24h Volume</span>
              <span className="text-sm font-medium">
                ${repo.volume24h.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Circulating Supply</span>
              <span className="text-sm font-medium">
                {repo.circulatingSupply.toLocaleString()} {repo.tokenSymbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Supply</span>
              <span className="text-sm font-medium">
                {repo.totalSupply.toLocaleString()} {repo.tokenSymbol}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const TokenBadge = ({
  icon: Icon,
  label,
  value,
  tooltip,
  variant = "outline",
  colorClass = "",
}: {
  icon: any;
  label?: string;
  value: string | number;
  tooltip?: string;
  variant?: "outline" | "default";
  colorClass?: string;
}) => {
  const badge = (
    <Badge
      variant={variant}
      className={`flex items-center gap-1 ${colorClass}`}
    >
      <Icon className="h-3 w-3" />
      {label && <span>{label}</span>}
      <span>{value}</span>
    </Badge>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
};

export default function Page() {
  const [repositories, setRepositories] = React.useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    // Simulating API call to fetch repositories
    const fetchRepositories = async () => {
      // In a real application, you would fetch data from an API here
      const mockRepositories: Repository[] = [
        {
          id: 1,
          name: "decentra-git",
          description:
            "A decentralized git hosting platform with built-in token economics.",
          language: "TypeScript",
          stars: 1200,
          forks: 234,
          updatedAt: "2 days ago",
          tokenSymbol: "DGT",
          tokenPrice: 0.05,
          marketCap: 5000000,
          liquidity: 250000,
          holders: 2500,
          topHoldersPercent: 45,
          snipersCount: 8,
          maxSnipers: 10,
          blueChipPercent: 65,
          rugpullRisk: "Low",
          auditScore: 95,
          maxAuditScore: 100,
          priceChange24h: 12.5,
          tokenHistory: [
            { date: "2023-01", price: 0.01 },
            { date: "2023-02", price: 0.02 },
            { date: "2023-03", price: 0.03 },
            { date: "2023-04", price: 0.04 },
            { date: "2023-05", price: 0.05 },
          ],
          volume24h: 500000,
          circulatingSupply: 100000000,
          totalSupply: 150000000,
        },
        // Add similar data for other repositories
      ];
      setRepositories(mockRepositories);
    };

    const fetchTransactions = async () => {
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          type: "buy",
          amount: 100,
          tokenSymbol: "DGT",
          price: 0.05,
          date: "2023-05-01",
        },
        {
          id: 2,
          type: "sell",
          amount: 50,
          tokenSymbol: "W3C",
          price: 0.02,
          date: "2023-05-02",
        },
        {
          id: 3,
          type: "buy",
          amount: 200,
          tokenSymbol: "DGT",
          price: 0.055,
          date: "2023-05-03",
        },
        {
          id: 4,
          type: "buy",
          amount: 150,
          tokenSymbol: "W3C",
          price: 0.022,
          date: "2023-05-04",
        },
        {
          id: 5,
          type: "sell",
          amount: 75,
          tokenSymbol: "DGT",
          price: 0.06,
          date: "2023-05-05",
        },
      ];
      setTransactions(mockTransactions);
    };

    fetchRepositories();
    fetchTransactions();
  }, []);

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Left column: User info */}
      <div className="w-full lg:w-1/4 space-y-4">
        <div className="flex flex-col items-center lg:items-start">
          <Avatar className="h-32 w-32 lg:h-64 lg:w-64">
            <AvatarImage src="https://github.com/shadcn.png" alt="@cryptodev" />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mt-4">CryptoDev</h1>
          <p className="text-xl text-muted-foreground">cryptodev</p>
        </div>
        <Button className="w-full">Connect Wallet</Button>
        <p className="text-sm">
          Building the future of decentralized development and collaboration.
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span className="mr-4">100 followers</span>
          <span>50 following</span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>Decentraland</span>
          </div>
          <div className="flex items-center">
            <Link2 className="mr-2 h-4 w-4" />
            <a href="#" className="text-blue-500 hover:underline">
              https://decentra.git
            </a>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Joined June 2023</span>
          </div>
        </div>
      </div>

      {/* Right column: Tabs and content */}
      <div className="w-full lg:w-3/4">
        <ReadmeSection />
        <Tabs defaultValue="overview" className="w-full mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repositories.slice(0, 4).map((repo) => (
                <Card key={repo.id} className="flex flex-col h-full">
                  <CardHeader className="flex-grow">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-blue-500 hover:underline cursor-pointer text-lg flex items-center">
                        {repo.name}
                      </CardTitle>
                      <AssetSheet repo={repo} />
                    </div>
                    <CardDescription className="text-sm mt-1">
                      {repo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                      <span className="mr-4">{repo.language}</span>
                      <Star className="mr-1 h-3 w-3" />
                      <span className="mr-4">{repo.stars}</span>
                      <GitFork className="mr-1 h-3 w-3" />
                      <span>{repo.forks}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <TokenBadge
                        icon={
                          repo.priceChange24h >= 0 ? TrendingUp : TrendingDown
                        }
                        value={`${repo.priceChange24h >= 0 ? "+" : ""}${
                          repo.priceChange24h
                        }%`}
                        colorClass={
                          repo.priceChange24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                        tooltip="24h price change"
                      />

                      <TokenBadge
                        icon={ChartBar}
                        label="MC"
                        value={`$${(repo.marketCap / 1000000).toFixed(1)}M`}
                        colorClass="text-blue-500"
                        tooltip="Market Capitalization"
                      />

                      <TokenBadge
                        icon={Droplet}
                        label="Liq"
                        value={`$${(repo.liquidity / 1000).toFixed(0)}K`}
                        colorClass="text-cyan-500"
                        tooltip="Available Liquidity"
                      />

                      <TokenBadge
                        icon={Target}
                        value={`${repo.snipersCount}/${repo.maxSnipers}`}
                        colorClass={
                          repo.snipersCount >= repo.maxSnipers * 0.8
                            ? "text-orange-500"
                            : "text-blue-500"
                        }
                        tooltip="Active snipers / Max snipers"
                      />

                      <TokenBadge
                        icon={Award}
                        label="BC"
                        value={`${repo.blueChipPercent}%`}
                        colorClass={
                          repo.blueChipPercent > 50
                            ? "text-purple-500"
                            : "text-gray-500"
                        }
                        tooltip="Blue Chip Percentage"
                      />

                      <TokenBadge
                        icon={Shield}
                        value={repo.rugpullRisk}
                        colorClass={
                          repo.rugpullRisk === "Low"
                            ? "text-green-500"
                            : repo.rugpullRisk === "Unknown"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }
                        tooltip="Rugpull Risk Assessment"
                      />

                      <TokenBadge
                        icon={Users}
                        value={`${(repo.holders / 1000).toFixed(1)}K`}
                        colorClass="text-indigo-500"
                        tooltip="Total Token Holders"
                      />

                      <TokenBadge
                        icon={Percent}
                        label="Top10"
                        value={`${repo.topHoldersPercent}%`}
                        colorClass={
                          repo.topHoldersPercent > 80
                            ? "text-red-500"
                            : repo.topHoldersPercent > 60
                            ? "text-yellow-500"
                            : "text-green-500"
                        }
                        tooltip="Percentage held by top 10 holders"
                      />

                      <TokenBadge
                        icon={AlertTriangle}
                        label="Safe"
                        value={`${repo.auditScore}/${repo.maxAuditScore}`}
                        colorClass={
                          repo.auditScore / repo.maxAuditScore >= 0.8
                            ? "text-green-500"
                            : repo.auditScore / repo.maxAuditScore >= 0.6
                            ? "text-yellow-500"
                            : "text-red-500"
                        }
                        tooltip="Security Audit Score"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 overflow-x-auto">
              <ContributionCalendar />
            </div>
          </TabsContent>
          <TabsContent value="repositories" className="mt-6">
            <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-2 top-1/2 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Find a repository..."
                  className="pl-8 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="sm">
                  Type
                </Button>
                <Button variant="outline" size="sm">
                  Language
                </Button>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </div>
            </div>
            <RepositoryList repositories={filteredRepositories} />
          </TabsContent>
          <TabsContent value="tokens" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Tokens</CardTitle>
                <CardDescription>
                  Manage your project tokens and rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {repositories.map((repo) => (
                    <div key={repo.id}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                        <div>
                          <h3 className="font-semibold">
                            {repo.name} ({repo.tokenSymbol})
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Price: ${repo.tokenPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Rocket className="mr-2 h-4 w-4" />
                            Boost
                          </Button>
                          <Button size="sm" variant="outline">
                            <Zap className="mr-2 h-4 w-4" />
                            Stake
                          </Button>
                          <AssetSheet repo={repo} />
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <TokenPriceChart tokenHistory={repo.tokenHistory} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Your recent token transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <TransactionHistory transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
