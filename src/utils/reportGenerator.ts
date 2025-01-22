import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Disease } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReportData {
  title: string;
  disease: Disease;
  date: string;
}

export const generatePDF = ({ title, disease, date }: ReportData) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text(title, 20, 20);

  // Add metadata
  doc.setFontSize(12);
  doc.text(`Date du rapport: ${format(new Date(), 'dd MMMM yyyy', { locale: fr })}`, 20, 30);
  doc.text(`Région: ${disease.region}`, 20, 40);

  // Add statistics
  const stats = [
    ['Nombre de cas', disease.cases.toString()],
    ['Guérisons', disease.recoveries.toString()],
    ['Décès', disease.deaths.toString()],
    ['Taux de guérison', `${((disease.recoveries / disease.cases) * 100).toFixed(1)}%`],
    ['Taux de mortalité', `${((disease.deaths / disease.cases) * 100).toFixed(1)}%`]
  ];

  autoTable(doc, {
    head: [['Statistique', 'Valeur']],
    body: stats,
    startY: 50,
    theme: 'grid'
  });

  // Add symptoms and notes if available
  if (disease.symptoms) {
    doc.text('Symptômes:', 20, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(10);
    doc.text(disease.symptoms, 20, doc.lastAutoTable.finalY + 30);
  }

  if (disease.notes) {
    doc.setFontSize(12);
    doc.text('Notes:', 20, doc.lastAutoTable.finalY + 50);
    doc.setFontSize(10);
    doc.text(disease.notes, 20, doc.lastAutoTable.finalY + 60);
  }

  // Save the PDF
  doc.save(`rapport-${disease.name}-${disease.region}-${date}.pdf`);
};