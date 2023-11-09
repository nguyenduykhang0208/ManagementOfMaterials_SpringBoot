import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { importCouponDetailData } from '../data/importCouponData';
import { ImportCouponService } from 'src/app/_service/importcoupon.service';

@Component({
  selector: 'app-import-coupon-detail',
  templateUrl: './import-coupon-detail.component.html',
  styleUrls: ['./import-coupon-detail.component.css'],
})
export class ImportCouponDetailComponent implements OnInit {
  listDetail: any;
  importCouponId: string = '';
  deleteForm: boolean = false;
  showForm: boolean = false;
  // importCouponDatailForm: any = {
  //   SOLUONG: null,
  //   DONGIA: null,
  // };
  constructor(
    private route: ActivatedRoute,
    private importCouponService: ImportCouponService
  ) {}
  ngOnInit(): void {
    this.getimportCouponId();
    this.getData();
  }
  getimportCouponId() {
    this.route.params.subscribe((params) => {
      this.importCouponId = params['id'];
    });
  }
  getData() {
    this.importCouponService
      .getListImportCouponDetail(+this.importCouponId)
      .subscribe({
        next: (res) => {
          this.listDetail = res;
          console.log(this.listDetail);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  // openUpdate(data: any) {
  //   this.showForm = true;
  //   this.importCouponDatailForm.SOLUONG = data.SOLUONG;
  //   this.importCouponDatailForm.DONGIA = data.DONGIA;
  // }
  onDelete() {
    this.deleteForm = true;
  }
  updateICDetail() {}
}
