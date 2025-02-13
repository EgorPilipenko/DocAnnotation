import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Annotation} from "../interfaces";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-annotation',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationComponent implements AfterViewInit {
  @Input() annotation!: Annotation;
  @Input() pageContainer!: any;
  @ViewChild('annotationInput') annotationInput: ElementRef<HTMLInputElement> | undefined ;
  @Output() update = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();
  @Output() move = new EventEmitter<MouseEvent>();
  movingBound;
  stopMoveBound;

  isMoving = false;

  ngAfterViewInit() {
    this.annotationInput?.nativeElement.focus();
  }

  constructor() {
    this.movingBound = this.moving.bind(this);
    this.stopMoveBound = this.stopMove.bind(this);
  }

  editAnnotation() {
    this.annotation.editing = true;
  }

  saveAnnotation() {
    if(!this.annotation.content)
      return
    this.update.emit(this.annotation.content);
  }

  deleteAnnotation() {
    this.delete.emit();
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.annotation.type = 'image';
        this.annotation.content = e.target.result;
        this.saveAnnotation();
      };
      reader.readAsDataURL(file);
    }
  }

  startMove() {
    this.isMoving = true;
    document.addEventListener('mousemove', this.movingBound);
    document.addEventListener('mouseup', this.stopMoveBound);
  }

  stopMove() {
    this.isMoving = false;
    document.removeEventListener('mousemove', this.movingBound);
    document.removeEventListener('mouseup', this.stopMoveBound);
  }

  moving(event: MouseEvent) {
    if (this.isMoving) {
      this.move.emit(event);
    }
  }
}
