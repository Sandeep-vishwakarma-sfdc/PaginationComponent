import { LightningElement,api,track } from 'lwc';

/**
 * A Pagination Component use to add javascript pagination to datatable/generic table.
 * @alias PaginationCmp
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-pagination-cmp page-size-value="100" tabledata={actualData} onaction={handlePaginationAction}>
 *      <div class="slds-float_right" style="margin-right: 20rem;" slot="pageNumber">
 *          <b class="pagenumber">{labels.Page}:</b>
 *      </div>
 * </c-pagination-cmp>
 */
export default class PaginationCmp extends LightningElement {

    /**
     * public property,set pageValue from parent component 
     * @example this.template.querySelector('c-pagination-cmp').pagevalue = 1;
     * @type Number
    */
    set pagevalue(value){
        this.page = value;
    }
    @api get pagevalue(){
        return this.page;
    }
    /**
     * public property,set page size Value from parent component
     * @type Number
    */
    set pageSizeValue(value){
        this.pageSize = Number(value);
        let opt = this.options.findIndex(op=>op.value==String(value));
        this.options[opt].default = true;
        console.log('options ',this.options);
    }
    @api get pageSizeValue(){
        return this.pageSize;
    }

    /**
     * public property,set tabledata i.e Actual Data you want to paginate.
     * @type {Array.<Object>}
    */
    set tabledata(value){
        if(value){
            setTimeout(() => {
        this.data = JSON.parse(JSON.stringify(value));
        console.log('Pagination data ',this.data,'page ',this.page);
        this.totalRecordCount = this.data.length;
        this.totalPage = Math.ceil(this.totalRecordCount/this.pageSize);
        this.displayRecordPerPage(this.page);
        }, 500);
        }
    }

    @api get tabledata(){
        return this.items;  
    }

    page = 1;
    options = [{'value':10,default:false},{'value':20,default:false},{'value':50,default:false},{'value':100,default:false}];

    startingRecord = 1;
    endingRecord = 0;
    pageSize = 10;
    totalRecordCount = 0;
    @track totalPage = 0;
    items = [];
    @track disableBtn = {first:false,previous:false,next:false,last:false};
    
    tabledata;
    data = [];
    

    labels = {
        Records_per_page:'Records per page',
        Page:'Page',
        of:'of',
        First:'First',
        Previous:'Previous',
        Next:'Next',
        Last:'Last'
    }

    
    
    get pageSizeOptions(){
        return this.options;
    }

    handleRecordsPerPage(event){
        this.pageSize = event.target.value;
        this.page = 1;
        this.totalPage = Math.ceil(this.totalRecordCount/this.pageSize);
        this.displayRecordPerPage(this.page);
    }
    
    /**
     * when previous isbutton is clicked.
    */
    handlePrevious(){
        if(this.page>1){
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        }
    }
    /**
     * when Next button is clicked.
    */
    handleNext(){
        if(this.page<this.totalPage && this.page!=this.totalPage){
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);
        }
    }

    /**
     * when First button is clicked.
    */
    handleFirst(){
        this.page = 1;
        this.displayRecordPerPage(this.page);
    }

    /**
     * when Last button is clicked.
    */
    handleLast(){
        this.page = this.totalPage;
        this.displayRecordPerPage(this.page);
    }

    displayRecordPerPage(page){
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecordCount) 
                            ? this.totalRecordCount : this.endingRecord; 

        this.items = this.data.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
        let objlist = {values:this.items,currentPage:this.page}
        if(this.querySelector('.pagenumber')){
            this.querySelector('.pagenumber').innerHTML = `${this.labels.Page}: ${this.page} ${this.labels.of} ${this.totalPage}`;
        }
        this.checkNextPreviousbtn(this.page,this.totalPage);
        this.dispatchEvent(new CustomEvent('action',{detail:objlist}))
    }

    checkNextPreviousbtn(page,totalpage){
        if(totalpage>=page+1){
          this.disableBtn.next = false;
        }else{
            this.disableBtn.next = true;
        }
        if(page>1){
            this.disableBtn.previous = false;
        }else{
            this.disableBtn.previous = true;
        }
        if(page==1||page==0){
            this.disableBtn.first = true;
        }else{
            this.disableBtn.first = false;
        }
        if(page==totalpage){
            this.disableBtn.last = true;
        }else{
            this.disableBtn.last = false;
        }
      }
}