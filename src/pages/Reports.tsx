
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Calendar, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const reports = [
  {
    id: 1,
    title: "Maandelijks Voortgangsrapport - April 2025",
    date: "30 Apr 2025",
    type: "monthly",
    status: "new",
    description:
      "Overzicht van voortgang in April 2025, inclusief cashflow ontwikkeling en spirit activaties.",
  },
  {
    id: 2,
    title: "Maandelijks Voortgangsrapport - Maart 2025",
    date: "31 Mar 2025",
    type: "monthly",
    status: "viewed",
    description:
      "Overzicht van voortgang in Maart 2025, inclusief cashflow ontwikkeling en spirit activaties.",
  },
  {
    id: 3,
    title: "Maandelijks Voortgangsrapport - Februari 2025",
    date: "28 Feb 2025",
    type: "monthly",
    status: "viewed",
    description:
      "Overzicht van voortgang in Februari 2025, inclusief cashflow ontwikkeling en spirit activaties.",
  },
  {
    id: 4,
    title: "Kwartaalrapport Q1 2025",
    date: "31 Mar 2025",
    type: "quarterly",
    status: "viewed",
    description:
      "Gedetailleerd rapport van het eerste kwartaal van 2025, inclusief volledige financiële analyse.",
  },
  {
    id: 5,
    title: "Maandelijks Voortgangsrapport - Januari 2025",
    date: "31 Jan 2025",
    type: "monthly",
    status: "viewed",
    description:
      "Overzicht van voortgang in Januari 2025, inclusief cashflow ontwikkeling en spirit activaties.",
  },
  {
    id: 6,
    title: "Jaaroverzicht 2024",
    date: "15 Jan 2025",
    type: "yearly",
    status: "viewed",
    description:
      "Volledig jaaroverzicht van 2024, inclusief prestatie-analyse en vooruitzichten voor 2025.",
  },
];

const Reports = () => {
  const [filter, setFilter] = React.useState("all");

  const filteredReports = React.useMemo(() => {
    switch (filter) {
      case "monthly":
        return reports.filter((report) => report.type === "monthly");
      case "quarterly":
        return reports.filter((report) => report.type === "quarterly");
      case "yearly":
        return reports.filter((report) => report.type === "yearly");
      case "new":
        return reports.filter((report) => report.status === "new");
      default:
        return reports;
    }
  }, [filter]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Rapporten</h1>
                <p className="text-muted-foreground">
                  Bekijk uw periodieke voortgangsrapporten
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle rapporten</SelectItem>
                    <SelectItem value="monthly">Maandelijks</SelectItem>
                    <SelectItem value="quarterly">Kwartaal</SelectItem>
                    <SelectItem value="yearly">Jaarlijks</SelectItem>
                    <SelectItem value="new">Nieuw</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Alle rapporten</TabsTrigger>
                <TabsTrigger value="monthly">Maandelijks</TabsTrigger>
                <TabsTrigger value="quarterly">Kwartaal</TabsTrigger>
                <TabsTrigger value="yearly">Jaarlijks</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rapporten ({filteredReports.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredReports.map((report) => (
                        <div
                          key={report.id}
                          className="flex flex-col rounded-lg border p-4 md:flex-row md:items-start md:justify-between md:space-x-4"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <h3 className="font-medium">{report.title}</h3>
                                {report.status === "new" && (
                                  <Badge className="ml-2 bg-investbotiq-primary">
                                    Nieuw
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {report.description}
                              </p>
                              <div className="flex text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>{report.date}</span>
                                <span className="mx-2">•</span>
                                <span>
                                  {report.type === "monthly"
                                    ? "Maandelijks"
                                    : report.type === "quarterly"
                                    ? "Kwartaal"
                                    : "Jaarlijks"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2 md:mt-0">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              Bekijken
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  Als gelezen markeren
                                </DropdownMenuItem>
                                <DropdownMenuItem>Archiveren</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="monthly">
                <Card>
                  <CardHeader>
                    <CardTitle>Maandelijkse Rapporten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports
                        .filter((report) => report.type === "monthly")
                        .map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{report.title}</p>
                                <div className="flex text-sm text-muted-foreground">
                                  <span>{report.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Bekijken
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="quarterly">
                <Card>
                  <CardHeader>
                    <CardTitle>Kwartaalrapporten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports
                        .filter((report) => report.type === "quarterly")
                        .map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{report.title}</p>
                                <div className="flex text-sm text-muted-foreground">
                                  <span>{report.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Bekijken
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="yearly">
                <Card>
                  <CardHeader>
                    <CardTitle>Jaarrapporten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports
                        .filter((report) => report.type === "yearly")
                        .map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{report.title}</p>
                                <div className="flex text-sm text-muted-foreground">
                                  <span>{report.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Bekijken
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
