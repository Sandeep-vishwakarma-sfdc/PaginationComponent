# Pagination Component
Add pagination to table/Datatable
## How to use
```
<c-pagination-cmp page-size-value="100" tabledata={actualData} onaction={handlePaginationAction}>
    <div class="slds-float_right" style="margin-right: 20rem;" slot="pageNumber">
        <b class="pagenumber">{labels.Page}:</b>
    </div>
</c-pagination-cmp>
```

### properties and events
```
page-size-value : Number of row you want to display for each page
actualData : Here Actual data means data which are coming from source (Apex,Promises)
handlePaginationAction : Implement this function to your parent to handle incoming paginated data
```

### Example
```
handlePaginationAction(event) {
        setTimeout(() => {// setting time out since it will take time for large number of records
            this.paginatedData = event.detail.values;
        }, 200);
}
```



