


def subarray(arr):
    a1 = [i[:-4] for i in arr]
    f1 = [i[0] for i in a1]
    f2 = [i[1] for i in a1]

    n=[]
    m=[]
    [n.extend(i) for i in f1]
    [m.extend(i) for i in f2]
    moviedict = {
        "movie":n,
        "poster":m
    }
    return moviedict

