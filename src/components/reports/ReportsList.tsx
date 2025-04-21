
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Maandelijks Voortgangsrapport - April 2025",
    date: "30 Apr 2025",
    type: "Maandelijks",
  },
  {
    id: 2,
    title: "Maandelijks Voortgangsrapport - Maart 2025",
    date: "31 Mar 2025",
    type: "Maandelijks",
  },
  {
    id: 3,
    title: "Maandelijks Voortgangsrapport - Februari 2025",
    date: "28 Feb 2025",
    type: "Maandelijks",
  },
  {
    id: 4,
    title: "Kwartaalrapport Q1 2025",
    date: "31 Mar 2025",
    type: "Kwartaal",
  },
];

const ReportsList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recente Rapporten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{report.title}</p>
                  <div className="flex text-sm text-muted-foreground">
                    <span>{report.date}</span>
                    <span className="mx-2">•</span>
                    <span>{report.type}</span>
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
  );
};

export default ReportsList;
