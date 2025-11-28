import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-chat',
  standalone: true,
  imports: [
    CommonModule],
  templateUrl: './dashboard-chat.html',
  styleUrls: ['./dashboard-chat.css'],
})
export class DashboardChat implements AfterViewInit {

  kpis = [
    { title: 'Total Active Permits', value: 54, icon: 'bi-file-earmark-text', color: 'primary', delta: '-11.5%' },
    { title: 'Permits Timed Out', value: 0, icon: 'bi-stopwatch', color: 'warning', delta: null },
    { title: 'Total Incidents', value: 7, icon: 'bi-exclamation-triangle', color: 'danger', delta: '+2 this month' },
    { title: 'Open Investigations', value: 16, icon: 'bi-people', color: 'info', delta: null }
  ];

  @ViewChild('permitVolumeChart') permitVolumeChartEl!: ElementRef;
  @ViewChild('permitStatusChart') permitStatusChartEl!: ElementRef;
  @ViewChild('incidentTrendChart') incidentTrendChartEl!: ElementRef;
  @ViewChild('topUnsafeChart') topUnsafeChartEl!: ElementRef;
  @ViewChild('complianceChart') complianceChartEl!: ElementRef;
  @ViewChild('incidentReportedChart') incidentReportedChartEl!: ElementRef;
  @ViewChild('summaryDonutChart') summaryDonutChartEl!: ElementRef;

  ngAfterViewInit(): void {
    this.renderPermitVolumeChart();
    this.renderPermitStatusChart();
    this.renderIncidentTrendChart();
    this.renderTopUnsafeChart();
    this.renderComplianceChart();
    this.renderIncidentReportedChart();
    this.renderSummaryDonutChart();
  }

  renderPermitVolumeChart() {
    const options = {
      chart: { type: 'bar', stacked: true, height: 300 },
      series: [
        { name: 'Cold Work', data: [0, 0, 0, 0, 1, 0, 0, 2, 3, 0, 1, 0] },
        { name: 'Confined Space', data: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0] },
        { name: 'Electrical', data: [0, 0, 0, 0, 1, 0, 0, 1, 4, 0, 2, 0] },
        { name: 'Excavation', data: [0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0] }
      ],
      colors: ['#4f46e5', '#06b6d4', '#f97316', '#ef4444'],
      plotOptions: { bar: { horizontal: false, columnWidth: '45%' } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      legend: { position: 'top' },
      dataLabels: { enabled: false }
    };
    new ApexCharts(this.permitVolumeChartEl.nativeElement, options).render();
  }

  renderPermitStatusChart() {
    const options = {
      chart: { type: 'donut', height: 240 },
      series: [12, 9, 8, 8],
      labels: ['Pending', 'Live', 'Work Completed', 'Closed'],
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#94a3b8'],
      plotOptions: { pie: { donut: { size: '68%' } } },
      legend: { position: 'bottom' }
    };
    new ApexCharts(this.permitStatusChartEl.nativeElement, options).render();
  }

  renderIncidentTrendChart() {
    const options = {
      chart: { type: 'line', height: 260, zoom: { enabled: false } },
      series: [{ name: 'Incidents', data: [1, 0, 2, 3, 1, 0, 2, 3, 4, 2, 5, 1] }],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 4 },
      colors: ['#ef4444'],
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      legend: { show: false }
    };
    new ApexCharts(this.incidentTrendChartEl.nativeElement, options).render();
  }

  renderTopUnsafeChart() {
    const options = {
      chart: { type: 'bar', height: 260 },
      series: [{ name: 'Count', data: [6, 4, 4, 1, 1] }],
      colors: ['#3b82f6'],
      plotOptions: { bar: { distributed: true, borderRadius: 6 } },
      xaxis: { categories: ['Housekeeping', 'Electrical', 'Equipment', 'Chemical', 'Training'] },
      dataLabels: { enabled: false }
    };
    new ApexCharts(this.topUnsafeChartEl.nativeElement, options).render();
  }

  renderComplianceChart() {
    const options = {
      chart: { type: 'radialBar', height: 200 },
      series: [82],
      colors: ['#2563eb'],
      plotOptions: {
        radialBar: {
          hollow: { size: '65%' },
          dataLabels: { name: { show: true }, value: { fontSize: '22px', show: true } }
        }
      },
      labels: ['Compliance']
    };
    new ApexCharts(this.complianceChartEl.nativeElement, options).render();
  }

  renderIncidentReportedChart() {
    const options = {
      chart: { type: 'donut', height: 160 },
      series: [4, 6, 6],
      labels: ['Sent for Inv', 'Completed', 'Approval'],
      colors: ['#60a5fa', '#34d399', '#fbbf24'],
      plotOptions: { pie: { donut: { size: '72%' } } }
    };
    new ApexCharts(this.incidentReportedChartEl.nativeElement, options).render();
  }

  renderSummaryDonutChart() {
    const options = {
      chart: { type: 'donut', height: 120 },
      series: [23, 5, 10],
      labels: ['Closed', 'Open', 'Pending'],
      colors: ['#84cc16', '#06b6d4', '#f97316'],
      plotOptions: { pie: { donut: { size: '78%' } } },
      legend: { position: 'right' }
    };
    new ApexCharts(this.summaryDonutChartEl.nativeElement, options).render();
  }

}
