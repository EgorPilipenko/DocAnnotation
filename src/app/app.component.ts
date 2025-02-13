import {Component, OnInit} from '@angular/core';
import {Annotation, DocumentPage} from "./interfaces";
import {FormsModule} from "@angular/forms";
import {AnnotationComponent} from "./annotation/annotation.component";

@Component({
    selector: 'app-root',
    imports: [FormsModule,
              AnnotationComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    document = { name: 'test doc', pages: [] as DocumentPage[] };
    zoomLevel = 1;

    ngOnInit() {
        this.loadDocument();
    }

    loadDocument() {
        const mockData = {
            name: "test doc",
            pages: [
                { number: 1, imageUrl: "pages/1.png" },
                { number: 2, imageUrl: "pages/2.png" },
                { number: 3, imageUrl: "pages/3.png" },
                { number: 4, imageUrl: "pages/4.png" },
                { number: 5, imageUrl: "pages/5.png" }
            ]
        };
        this.document.name = mockData.name;
        this.document.pages = mockData.pages.map(page => ({ ...page, annotations: [] }));
    }

    zoomIn() {
        this.zoomLevel += 0.1;
    }

    zoomOut() {
        this.zoomLevel = Math.max(0.5, this.zoomLevel - 0.1);
    }

    addAnnotation(page: DocumentPage, event: MouseEvent, pageContainer: any) {

        const rect = pageContainer.getBoundingClientRect();
        const annotation: Annotation = {
            type: 'text',
            content: '',
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            editing: true
        };
        page.annotations.push(annotation);
    }

    moveAnnotation(annotation: Annotation, event: MouseEvent, pageContainer: any) {
        const rect = pageContainer.getBoundingClientRect();
        annotation.x = event.clientX-5 - rect.left;
        annotation.y = event.clientY-5 - rect.top;
    }

    updateAnnotation(annotation: Annotation, content: string) {
        annotation.content = content;
        annotation.editing = false;
    }

    deleteAnnotation(page: DocumentPage, annotation: Annotation) {
        page.annotations = page.annotations.filter(a => a !== annotation);
    }

    saveAnnotations() {
        console.log(JSON.stringify(this.document, null, 2));
    }
}
