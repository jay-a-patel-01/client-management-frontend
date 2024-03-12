import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  
  private basePath = '';
  private rootPath = environment.rootPath;

  constructor(private http: HttpClient, 
      ) {
    this.basePath = '';
  }

  public get(path: string) {
  
    return this.http.get (this.rootPath + this.basePath + path);
  }


  public post (path: string, data: any) {

    return this.http.post (this.rootPath + this.basePath + path, data);
  }
}
