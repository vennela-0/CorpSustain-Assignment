import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import ApexCharts from 'apexcharts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blue-dashboard-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blue-dashboard-component.html',
  styleUrls: ['./blue-dashboard-component.css'],
})
export class BlueDashboardComponent implements AfterViewInit, OnDestroy {

  sidebarOpen = true;

  kpis = [
    { title: 'Total Active Permits', value: 54, icon: 'bi-file-earmark-text', color: 'primary', delta: '-11.5%' },
    { title: 'Permits Timed Out', value: 0, icon: 'bi-stopwatch', color: 'warning', delta: null },
    { title: 'Total Incidents', value: 7, icon: 'bi-exclamation-triangle', color: 'danger', delta: '+2 this month' },
    { title: 'Open Investigations', value: 16, icon: 'bi-people', color: 'info', delta: null }
  ];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years = [2023, 2024, 2025];
  selectedMonth: string = 'Jan';
  selectedYear: number = 2023;
  chartColor: string = '#2563eb'; 
  @ViewChild('permitVolumeChart') permitVolumeChartEl!: ElementRef;
  @ViewChild('permitStatusChart') permitStatusChartEl!: ElementRef;

  permitVolumeChart: ApexCharts | null = null;
  permitStatusChart: ApexCharts | null = null;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.renderPermitVolumeChart();
    this.renderPermitStatusChart();
  }

  ngOnDestroy(): void {
    if (this.permitVolumeChart) this.permitVolumeChart.destroy();
    if (this.permitStatusChart) this.permitStatusChart.destroy();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onNavigateToReports() {
    this.toggleSidebar();
    this.router.navigate(['/dashboard-chat']);
  }

  onFilterChange() {
    if (this.permitVolumeChart) this.permitVolumeChart.destroy();
    if (this.permitStatusChart) this.permitStatusChart.destroy();
    this.renderPermitVolumeChart();
    this.renderPermitStatusChart();
  }

  onColorChange() {
    if (this.permitVolumeChart) {
      this.permitVolumeChart.updateOptions({
        colors: [this.chartColor, this.chartColor, this.chartColor, this.chartColor]
      });
    }
    if (this.permitStatusChart) {
      this.permitStatusChart.updateOptions({
        colors: [this.chartColor, this.chartColor, this.chartColor, this.chartColor]
      });
    }
  }

  renderPermitVolumeChart() {
    const options = {
      chart: { type: 'bar', stacked: true, height: 300 },
      series: [
        { name: 'Cold Work', data: this.getFilteredData('Cold Work') },
        { name: 'Confined Space', data: this.getFilteredData('Confined Space') },
        { name: 'Electrical', data: this.getFilteredData('Electrical') },
        { name: 'Excavation', data: this.getFilteredData('Excavation') }
      ],
      colors: [this.chartColor, this.chartColor, this.chartColor, this.chartColor],
      plotOptions: { bar: { horizontal: false, columnWidth: '45%' } },
      xaxis: { categories: this.months },
      legend: { position: 'top' },
      dataLabels: { enabled: false }
    };
    this.permitVolumeChart = new ApexCharts(this.permitVolumeChartEl.nativeElement, options);
    this.permitVolumeChart.render();
  }

  renderPermitStatusChart() {
    const options = {
      chart: { type: 'donut', height: 240 },
      series: [12, 9, 8, 8],
      labels: ['Pending', 'Live', 'Work Completed', 'Closed'],
      colors: [this.chartColor, this.chartColor, this.chartColor, this.chartColor],
      plotOptions: { pie: { donut: { size: '68%' } } },
      legend: { position: 'bottom' }
    };
    this.permitStatusChart = new ApexCharts(this.permitStatusChartEl.nativeElement, options);
    this.permitStatusChart.render();
  }

  getFilteredData(type: string): number[] {
    if (this.selectedMonth === 'Jan') {
      return [0, 0, 0, 0, 1, 0, 0, 2, 3, 0, 1, 0];
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}
