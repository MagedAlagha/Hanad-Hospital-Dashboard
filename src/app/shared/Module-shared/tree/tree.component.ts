import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { of, map } from 'rxjs';
import { IconSharedComponent } from '../icon-shared/icon-shared.component';

@Component({
    standalone: true,
    imports: [CommonModule, TranslationModule, TreeModule, IconSharedComponent],
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
    // Inputs
    @Input() layout: string = '';
    @Input() selectionMode: string = 'single';
    @Input() data$: Observable<any> = of();
    @Input() emptyMessage: string = '';
    @Input() draggableNodes: boolean = false;
    @Input() droppableNodes: boolean = false;
    @Input() draggableScope: string = 'self';
    @Input() droppableScope: string = 'self';
    @Input() filter: boolean = true;
    @Input() keyID: string = 'Code';
    @Input() keyParent: string = 'ParentCode';
    @Input() filterBy: string = 'Name';
    @Input() virtualScroll: boolean = false;
    @Input() virtualScrollItemSize: number = 40;
    @Input() scrollHeight: string = '400px';
    @Input() validateDrop: boolean = false;
    @Input() isDelete: boolean = true;
    @Input() isEdit: boolean = true;
    @Input() isAdd: boolean = true;
    @Input() FromAccountTree: boolean = false;
    @Input() keyParentOfChildMaybeEqualZero: boolean = false;
    dataTree$: Observable<any> | undefined;
    itemsSelected: any;

    // Out puts
    @Output() nodeSelect = new EventEmitter();
    @Output() nodeUnselect = new EventEmitter();
    @Output() nodeExpand = new EventEmitter();
    @Output() onNodeDrop = new EventEmitter();
    @Output() onNodeDrag = new EventEmitter();
    @Output() onNodeAdd = new EventEmitter();
    @Output() onNodeEdit = new EventEmitter();
    @Output() onNodeDelete = new EventEmitter();
    ngOnInit() {
        this.dataTree$ = this.data$.pipe(
            tap((value) => {}),
            map((value: { data: []; loading: boolean }) => {
                return {
                    ...value,
                    data: this.convertToTree(value.data),
                };
            })
        );
    }
    s: any = '&&';

    convertToTree(list: any[]) {
        // list.forEach((value) => {
        //     // value.draggable = '';
        //     // value.droppable = '';
        //     // value.selectable = '';
        //     // value.type = '';
        //     // value.key = '';
        //     // value.leaf = '';
        //     value.collapsedIcon = 'pi pi-folder';
        //     value.expandedIcon = 'pi pi-folder-open';
        // });
        var map = [],
            node,
            roots = [],
            i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i][this.keyID]] = i; // initialize the map
            list[i].collapsedIcon = list[i]?.collapsedIcon || 'pi pi-folder';
            list[i].expandedIcon = list[i]?.expandedIcon || 'pi pi-folder-open';
            list[i].key = list[i][this.keyID];
            list[i].children = []; // initialize the children
            list[i].isDelete = this.isDelete;
            list[i].isEdit = this.isEdit;
            list[i].isAdd = this.isAdd;
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (
                ((node[this.keyParent] && node[this.keyParent] != '0') ||
                    (this.keyParentOfChildMaybeEqualZero &&
                        node[this.keyParent] == 0)) &&
                node[this.keyParent] !== '#'
            ) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node[this.keyParent]]]?.children.push(node);
            } else {
                roots.push(node);
            }
        }

        return roots;
    }
}
