import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sumary-afb',
  templateUrl: './sumary-afb.component.html',
  styleUrls: ['./sumary-afb.component.css']
})

export class SumaryAfbComponent implements OnInit {
  sumThrid: any;

  SumToption: any;
  sum: any;
  chartData:any;
  chartDataM:any;
  chartDataW:any;
  chartDataD:any;
  constructor(private http: HttpClient) {
    
  }


  ngOnInit(): void {
    this.http.get('http://localhost/backend/select_sum_afb_thrid.php').subscribe(res => {
      const dataFromAPI = res as { po_date: string, total_item_price_sum: string, quarter: string }[];
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      const dataByQuarter = dataFromAPI.reduce((acc, cur) => {
        const existingIndex = acc.findIndex(data => data.quarter === cur.quarter);
        if (existingIndex !== -1) {
          acc[existingIndex].total_item_price_sum += Number(cur.total_item_price_sum); // แปลงเป็นตัวเลขก่อนบวก
        } else {
          acc.push({ ...cur, total_item_price_sum: Number(cur.total_item_price_sum) }); // แปลงเป็นตัวเลขก่อนเก็บไว้
        }
        return acc;
      }, [] as { po_date: string, total_item_price_sum: number, quarter: string }[]);

      const labels = ['ไตรมาสที่1', 'ไตรมาสที่2', 'ไตรมาสที่3', 'ไตรมาสที่4'];
      const dataSet = {
        label: 'งบที่ใช้',
        data: labels.map(label => {
          const quarterData = dataByQuarter.find(data => {
            if (label === 'ไตรมาสที่1') return data.quarter === 'Q1';
            else if (label === 'ไตรมาสที่2') return data.quarter === 'Q2';
            else if (label === 'ไตรมาสที่3') return data.quarter === 'Q3';
            else if (label === 'ไตรมาสที่4') return data.quarter === 'Q4';
            return false;
          });
          return quarterData ? quarterData.total_item_price_sum : 0;
        }),
        borderWidth: 1
      };
      this.sumThrid = {
        labels: labels,
        datasets: [dataSet]
      };

      this.SumToption = {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    });
    this.http.get('http://localhost/backend/select_sum_afb_year.php').subscribe((data: any) => { // ระบุ any[] เพื่อระบุชนิดของข้อมูลที่ได้รับมา
    const labels = data.map((item: { year: any; }) => item.year);
    const values = data.map((item: { total_item_price_sum: string; }) => parseFloat(item.total_item_price_sum));

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'งบที่ใช้',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  });
  this.http.get('http://localhost/backend/select_sum_afb_mounth.php').subscribe((data: any) => { 
    const labels = data.map((item: { month: any; }) => convertNumberToMonthName(item.month));
    const values = data.map((item: { total_item_price_sum: string; }) => parseFloat(item.total_item_price_sum));
  
    // ฟังก์ชันแปลงตัวเลขของเดือนเป็นชื่อเดือนในภาษาไทย
    function convertNumberToMonthName(month: number): string {
      const months = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
    
      return months[month - 1];
    }
    
    this.chartDataM = {
      labels: labels,
      datasets: [
        {
          label: 'งบที่ใช้',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  });
  
    this.http.get('http://localhost/backend/select_sum_afb_week.php').subscribe((data: any) => { 
    const labels = data.map((item: { week_number: any; }) => item.week_number);
      const values = data.map((item: { total_item_price_sum: string; }) => parseFloat(item.total_item_price_sum));

      this.chartDataW = {
        labels: labels,
        datasets: [
          {
            label: 'งบที่ใช้',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      };
    });
    this.http.get('http://localhost/backend/select_sum_afb_day.php').subscribe((data: any) => { // ระบุ any[] เพื่อระบุชนิดของข้อมูลที่ได้รับมา
    const labels = data.map((item: { DAY: any; }) => item.DAY);
    const values = data.map((item: { total_item_price_sum: string; }) => parseFloat(item.total_item_price_sum));

    this.chartDataD = {
      labels: labels,
      datasets: [
        {
          label: 'งบที่ใช้',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  });
}
test(){
  const url = 'http://localhost/backend/export_excel_afb.php';
  this.http.get<any[]>(url).subscribe((res: any[]) => {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const sheets: { [key: string]: any[] } = {};

    // แบ่งข้อมูลตาม material_class_shelf_id
    res.forEach(item => {
      const shelfId = item.ไตรมาสที่;
      if (!sheets[shelfId]) {
        sheets[shelfId] = [];
      }
      sheets[shelfId].push(item);
    });

    // เขียนข้อมูลลงในแต่ละ WorkSheet
    Object.keys(sheets).forEach((key, index) => {
      const wsName = 'ไตรมาสที่' + (index + 1);
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheets[key]);
      XLSX.utils.book_append_sheet(wb, ws, wsName);
    });

    // บันทึกไฟล์ Excel
    XLSX.writeFile(wb, 'รายงานการสั่งซื้อวัสดุตามไตรมาส.xlsx');
});
}
}



