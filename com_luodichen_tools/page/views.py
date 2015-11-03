from django.template import Context, loader
from django.http.response import HttpResponse, HttpResponseRedirect

# Create your views here.

def redirect_index(request):
    return HttpResponseRedirect('/page/')

def index(request):
    template = loader.get_template('index.html')
    context = Context({
    })
    
    return HttpResponse(template.render(context))
