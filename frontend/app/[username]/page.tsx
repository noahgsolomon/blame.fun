"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PROFILE, GET_USER_REPOSITORIES } from "@/lib/queries";
import { useUserStore } from "@/app/stores/user-store";
import Markdown from "react-markdown";
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
  Heart,
  Plus,
  Upload,
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
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UPDATE_USER } from "@/lib/mutations";

interface Transaction {
  id: number;
  type: "buy" | "sell";
  amount: number;
  tokenSymbol: string;
  price: number;
  date: string;
}

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
  slug: string;
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

const EmptyRepositories = ({ isOwnProfile }: { isOwnProfile: boolean }) => {
  return (
    <div className="text-center p-6 border rounded-lg bg-card">
      <div className="mb-6">
        <Image
          src="/coin.gif"
          alt="No repositories"
          width={120}
          height={120}
          className="mx-auto opacity-50"
        />
      </div>
      {isOwnProfile ? (
        <>
          <h3 className="text-lg font-semibold mb-2">
            You don&apos;t have any repositories yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Repositories are a great way to share your code and work with
            others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/create/repository">
                <Plus className="mr-2 h-4 w-4" />
                New repository
              </Link>
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import repository
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">
            This user doesn&apos;t have any repositories yet
          </h3>
          <p className="text-muted-foreground">
            When they create repositories, they&apos;ll appear here.
          </p>
        </>
      )}
    </div>
  );
};

const RepositoryList = ({
  repositories,
  isOwnProfile,
  username,
}: {
  repositories: Repository[];
  isOwnProfile: boolean;
  username: string;
}) => {
  if (!repositories.length) {
    return <EmptyRepositories isOwnProfile={isOwnProfile} />;
  }

  return (
    <div className="space-y-4">
      {repositories.map((repo) => (
        <Card key={repo.id} className="flex flex-col h-full">
          <CardHeader className="flex-grow">
            <div className="flex justify-between items-start">
              <Link href={`/${username}/${repo.slug}`}>
                <CardTitle className="text-blue-500 hover:underline cursor-pointer text-lg flex items-center">
                  {repo.name}
                </CardTitle>
              </Link>
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

const ReadmeSection = ({
  content,
  username,
}: {
  content: string;
  username: string;
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          {username} / README.md
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown>{content}</Markdown>
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
  const router = useRouter();
  const params = useParams();
  const { user } = useUserStore();
  const [repositories, setRepositories] = React.useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  const isOwnProfile = user?.username === params.username;

  const {
    data: profileData,
    loading: profileLoading,
    refetch,
  } = useQuery(GET_USER_PROFILE, {
    variables: { username: params.username },
    skip: !params.username,
  });

  const { data: repoData, loading: repoLoading } = useQuery(
    GET_USER_REPOSITORIES,
    {
      variables: { username: params.username },
      skip: !params.username,
    }
  );

  React.useEffect(() => {
    console.log("sup profileData", profileData);
    if (!profileLoading && profileData.user.length === 0) {
      router.push("/404");
    }
    if (profileData?.user[0]) {
      setEditForm({
        name: profileData.user[0].name || "",
        bio: profileData.user[0].bio || "",
        location: profileData.user[0].location || "",
        website: profileData.user[0].website || "",
      });
    }
  }, [profileData, profileLoading]);

  React.useEffect(() => {
    if (repoData?.repositories) {
      const mappedRepos = repoData.repositories.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: "TypeScript", // This would come from backend eventually
        stars: 0, // These would come from backend eventually
        forks: 0,
        slug: repo.slug,
        updatedAt: repo.updatedAt,
        tokenSymbol: "TKN",
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
      }));
      setRepositories(mappedRepos);
    }
  }, [repoData]);

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [updateUser] = useMutation(UPDATE_USER);

  const handleSave = async () => {
    try {
      const result = await updateUser({
        variables: {
          id: user?.id ?? "",
          attributes: {
            name:
              editForm.name && editForm.name !== "" ? editForm.name : undefined,
            bio: editForm.bio && editForm.bio !== "" ? editForm.bio : undefined,
            location:
              editForm.location && editForm.location !== ""
                ? editForm.location
                : undefined,
            website:
              editForm.website && editForm.website !== ""
                ? editForm.website
                : undefined,
          },
        },
      });

      console.log("Update result:", result);

      if (result.data) {
        setIsEditing(false);
        await refetch();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (profileLoading || profileData.user.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Left column: User info */}
      <div className="w-full lg:w-1/4 space-y-4">
        <div className="flex flex-col items-center lg:items-start">
          <Avatar className="h-32 w-32 lg:h-64 lg:w-64">
            <AvatarImage
              src={profileData?.user[0].avatar ?? ""}
              alt={profileData?.user[0].username ?? ""}
            />
            <AvatarFallback>
              {profileData?.user[0].username.slice(0, 2).toUpperCase() ?? ""}
            </AvatarFallback>
          </Avatar>
          {isEditing ? (
            <Input
              className="mt-4 text-2xl font-bold"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
          ) : (
            <h1 className="text-2xl font-bold mt-4">
              {profileData?.user[0].name}
            </h1>
          )}
          <p className="text-xl text-muted-foreground">
            {profileData?.user[0].username}
          </p>
        </div>
        <div className="flex flex-row gap-2 w-full">
          {isOwnProfile &&
            (isEditing ? (
              <div className="flex gap-2 w-full">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleSave}
                >
                  Save profile
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit profile
              </Button>
            ))}
        </div>
        {isEditing ? (
          <Textarea
            className="text-sm"
            value={editForm.bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            placeholder="Add a bio"
          />
        ) : (
          <p className="text-sm">{profileData?.user[0].bio}</p>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span className="mr-4">100 followers</span>
          <span>50 following</span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            {isEditing ? (
              <Input
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                placeholder="Add location"
              />
            ) : (
              <span>{profileData?.user[0].location}</span>
            )}
          </div>
          <div className="flex items-center">
            <Link2 className="mr-2 h-4 w-4" />
            {isEditing ? (
              <Input
                value={editForm.website}
                onChange={(e) =>
                  setEditForm({ ...editForm, website: e.target.value })
                }
                placeholder="Add website"
              />
            ) : (
              <a
                target="_blank"
                href={profileData?.user[0].website}
                className="text-blue-500 hover:underline"
              >
                {profileData?.user[0].website}
              </a>
            )}
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>
              Joined{" "}
              {profileData?.user[0].createdAt
                ? new Date(
                    profileData?.user[0].createdAt.split(".")[0]
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Right column: Tabs and content */}
      <div className="w-full lg:w-3/4">
        {profileData?.readmeContent[0]?.fileContent && (
          <ReadmeSection
            content={profileData.readmeContent[0].fileContent}
            username={(params.username ?? "") as string}
          />
        )}
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
                      <Link href={`/${params.username}/${repo.slug}`}>
                        <CardTitle className="text-blue-500 hover:underline cursor-pointer text-lg flex items-center">
                          {repo.name}
                        </CardTitle>
                      </Link>
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
            {repoLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  <span>Loading repositories...</span>
                </div>
              </div>
            ) : (
              <RepositoryList
                repositories={filteredRepositories}
                isOwnProfile={isOwnProfile}
                username={(params.username ?? "") as string}
              />
            )}
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
