class TBinder{
            prop2node={multi:[]}
            text="";
            text_clone=""
            target=null
            decorators={
                date:function(val){
                    return val.split("-").reverse().join(".")
                },
                ucfirst:function(val){
                    if(val.length>0){
                        return val[0].toUpperCase()+val.substr(1).toLowerCase();
                    }
                    return val
                }
            }
            bind_event=function(node){
                if(!node)
                    return
                node.addEventListener('change', this.listen.bind(this, node))
                node.addEventListener('j-change', this.listen.bind(this, node))
            };
            bind_event_n=function(nodes){
                if(!nodes)
                    return
                for(const node of nodes){
                    node.addEventListener('change', this.listen.bind(this, node))
                    node.addEventListener('j-change', this.listen.bind(this, node))
                }
            };

            listen(node, event){
                const identifier=node.dataset.id??node.id
                if(event.target && (event.target.id==identifier ||event.target.dataset.id==identifier)){
                    if(this.prop2node[identifier].decorator){
                        this.prop2node[identifier].val=this.decorators[this.prop2node[identifier].decorator](event.target.value);
                    }else{
                        this.prop2node[identifier].val=event.target.value;
                    }
                }
                this.evaluate_text();
            }

            listen_multi(index, key, className, event){
                if(event.target && event.target.classList.contains(className)){
                    this.evaluate_text_multi(index, key);
                }
            }

            set_prop=function(key, decorator){
                let node=document.getElementById(key);
                this.prop2node[key]={node:node, val:null, decorator: decorator}
            }
            set_prop_n=function(key, decorator){
                let node=document.getElementsByClassName(key);
                this.prop2node[key]={node:node, val:null, decorator: decorator}
            }

            set_array=function(key, template, separator=","){
                this.prop2node['multi'].push({key, template})
            }

            set_text=function(text){
                this.text=text
            }

            set_target=function(node){
                this.target=node
            }

            evaluate_text(){
                let temp=this.text;
                for(const [key, property] of  Object.entries(this.prop2node)){
                    if(property.val){
                        temp=temp.replaceAll("{"+key.toString()+"}", property.val)
                    }
                }
                this.text_clone=temp;
                this.target.innerHTML=this.text_clone

                for(let i=0;i<this.prop2node.multi.length;i++){
                    this.evaluate_text_multi(i, this.prop2node.multi[i].key)
                }
            }

            evaluate_text_multi(index, key){
                let temp=this.text;
                let prop=this.prop2node.multi[index]
                const regex = /{[a-zA-Z_]*}/gi;
                let slots=prop.template.match(regex);
                let result=[];
                for(const slot of slots){
                    var className=slot.replaceAll("{","").replaceAll("}", "");
                    var nodes=document.getElementsByClassName(className)
                    for(let i=0;i<nodes.length; i++){
                        let n=nodes[i]
                        if(!result[i]){
                            result[i]=prop.template;
                        }
                        result[i]=result[i].replaceAll("{"+className.toString()+"}", n.value)
                    }
                }
                this.text_clone=temp.replaceAll("["+key.toString()+"]", result.join(", "))

                temp=this.text_clone
                for(const [key, property] of  Object.entries(this.prop2node)){
                    if(property.val){
                        temp=temp.replaceAll("{"+key.toString()+"}", property.val)
                    }
                }
                this.text_clone=temp;
                this.target.innerHTML=this.text_clone

            }

            run=function(){
                for(const [key, property] of  Object.entries(this.prop2node)){
                    if(HTMLCollection.prototype.isPrototypeOf(property.node)){
                        this.bind_event_n(property.node);
                        continue;
                    }
                    this.bind_event(property.node);
                }
                const regex = /{[a-zA-Z_]*}/gi;
                for(const [k, c] of Object.entries(this.prop2node.multi)){
                    var slots = c.template.match(regex);
                    for(const slot of slots){
                        var className=slot.replaceAll("{","").replaceAll("}", "");
                        var nodes=document.getElementsByClassName(className)
                        for(const n of nodes){
                            document.addEventListener('change', this.listen_multi.bind(this, k, c.key, className))
                        }
                    }
                }
                if($){
                    $("*").change(function(e){
                        let element=e.target
                        var evt = new CustomEvent("j-change");
                        element.dispatchEvent(evt);
                    });
                }
            }
            trigger=function(){
                for(const [key, property] of  Object.entries(this.prop2node)){
                    if(key=='multi'){
                        continue
                    }
                    if(HTMLCollection.prototype.isPrototypeOf(property.node)){
                        for(const n of property.node){
                            let element=n
                            var evt = new CustomEvent("j-change");
                            if(element.value===''){
                                continue
                            }
                            element.dispatchEvent(evt);
                        }
                        continue;
                    }
                    let element=property.node
                    var evt = new CustomEvent("j-change");
                    if(element.value===''){
                        continue
                    }
                    element.dispatchEvent(evt);
                }
            }
        }